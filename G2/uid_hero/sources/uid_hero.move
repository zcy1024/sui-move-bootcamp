module uid_hero::uid_hero;

use std::string::String;
use sui::dynamic_field as df;
use sui::vec_map::{Self, VecMap};

const ENotEmptyArena: u64 = 0;

public enum AttributeKey has copy, drop, store {
    Earth,
    Fire,
    Water,
    Air,
}

public struct Hero has key, store {
    id: UID,
    name: String,
    power: u64,
    wins: vector<UID>,
}

public struct FightArena has key {
    id: UID,
    hero1: VecMap<address, Hero>,
    hero2: VecMap<address, Hero>,
}

public struct AdminCap has key {
    id: UID,
}

fun init(ctx: &mut TxContext) {
    transfer::transfer(AdminCap { id: object::new(ctx) }, ctx.sender());
}

public fun create_hero(_admin_cap: &AdminCap, name: String, power: u64, ctx: &mut TxContext): Hero {
    let hero = Hero {
        id: object::new(ctx),
        name,
        power,
        wins: vector[],
    };
    hero
}

public fun attach_attribute(_admin_cap: &AdminCap, hero: &mut Hero, key: AttributeKey, level: u64) {
    df::add(&mut hero.id, key, level);
}

public fun create_arena(_admin_cap: &AdminCap, ctx: &mut TxContext) {
    let arena = FightArena {
        id: object::new(ctx),
        hero1: vec_map::empty(),
        hero2: vec_map::empty(),
    };
    transfer::share_object(arena);
}

public fun add_hero_to_arena(arena: &mut FightArena, owner: address, hero: Hero) {
    if (arena.hero1.is_empty()) {
        arena.hero1.insert(owner, hero);
    } else if (arena.hero2.is_empty()) {
        arena.hero2.insert(owner, hero);
    } else {
        abort ENotEmptyArena
    }
}

public fun fight(_admin_cap: &AdminCap, arena: FightArena) {
    let FightArena { id: arena_id, hero1: mut hero_entry1, hero2: mut hero_entry2 } = arena;
    arena_id.delete();

    let (address1, hero1) = hero_entry1.pop();
    hero_entry1.destroy_empty();
    let (address2, hero2) = hero_entry2.pop();
    hero_entry2.destroy_empty();

    let (winner_address, mut winner_hero, loser_hero) = if (hero1.power > hero2.power) {
        (address1, hero1, hero2)
    } else {
        (address2, hero2, hero1)
    };

    let Hero { id: loser_id, power: _, name: _, wins: loser_wins } = loser_hero;
    loser_wins.do!(|l_attr_uid| l_attr_uid.delete());

    winner_hero.wins.push_back(loser_id);
    transfer::transfer(winner_hero, winner_address);
}

public fun upgrade_attributes(hero: &mut Hero) {
    let Hero { id: _, name: _, power: _, wins: _ } = hero;
    let mut earth: u64 = attribute_opt(&hero.id, AttributeKey::Earth).destroy_or!(0);
    let mut fire: u64 = attribute_opt(&hero.id, AttributeKey::Fire).destroy_or!(0);
    let mut water: u64 = attribute_opt(&hero.id, AttributeKey::Water).destroy_or!(0);
    let mut air: u64 = attribute_opt(&hero.id, AttributeKey::Air).destroy_or!(0);

    while (hero.wins.length() > 0) {
        let loser_id = hero.wins.pop_back();
        
        let l_earth: u64 = attribute_opt(&loser_id, AttributeKey::Earth).destroy_or!(0);
        let l_fire: u64 = attribute_opt(&loser_id, AttributeKey::Fire).destroy_or!(0);
        let l_water: u64 = attribute_opt(&loser_id, AttributeKey::Water).destroy_or!(0);
        let l_air: u64 = attribute_opt(&loser_id, AttributeKey::Air).destroy_or!(0);

        loser_id.delete();

        earth = if (earth < l_earth) { l_earth } else { earth };
        fire = if (fire < l_fire) { l_fire } else { fire };
        water = if (water < l_water) { l_water } else { water };
        air = if (air < l_air) { l_air } else { air };
    };

    if (df::exists_(&hero.id, AttributeKey::Earth)) {
        df::remove<AttributeKey, u64>(&mut hero.id, AttributeKey::Earth);
    };
    if (df::exists_(&hero.id, AttributeKey::Fire)) {
        df::remove<AttributeKey, u64>(&mut hero.id, AttributeKey::Fire);
    };
    if (df::exists_(&hero.id, AttributeKey::Water)) {
        df::remove<AttributeKey, u64>(&mut hero.id, AttributeKey::Water);
    };
    if (df::exists_(&hero.id, AttributeKey::Air)) {
        df::remove<AttributeKey, u64>(&mut hero.id, AttributeKey::Air);
    };
    df::add(&mut hero.id, AttributeKey::Earth, earth);
    df::add(&mut hero.id, AttributeKey::Fire, fire);
    df::add(&mut hero.id, AttributeKey::Water, water);
    df::add(&mut hero.id, AttributeKey::Air, air);
}

fun attribute_opt(hero_id: &UID, attribute_opt: AttributeKey): Option<u64> {
    match (df::exists_(hero_id, attribute_opt)) {
        true => option::some(*df::borrow(hero_id, attribute_opt)),
        _ => option::none(),
    }
}

// Test Only

#[test_only]
use sui::test_scenario as ts;
use sui::test_utils::assert_eq;

const ADMIN: address = @0xAA;
const USER1: address = @0xBB;
const USER2: address = @0xCC;

#[test]
fun test_end_to_end() {
    let mut ts = ts::begin(ADMIN);
    {
        assert_eq(ts.has_most_recent_for_sender<AdminCap>(), false);
        init(ts.ctx());
    };

    ts.next_tx(ADMIN);
    {
        let admin_cap = ts.take_from_sender<AdminCap>();

        let mut hero1 = create_hero(&admin_cap, b"Hero 1".to_string(), 100, ts.ctx());
        attach_attribute(&admin_cap, &mut hero1, AttributeKey::Earth, 100);
        attach_attribute(&admin_cap, &mut hero1, AttributeKey::Water, 100);
        transfer::public_transfer(hero1, USER1);

        let mut hero2 = create_hero(&admin_cap, b"Hero 2".to_string(), 50, ts.ctx());
        attach_attribute(&admin_cap, &mut hero2, AttributeKey::Earth, 500);
        attach_attribute(&admin_cap, &mut hero2, AttributeKey::Fire, 500);
        attach_attribute(&admin_cap, &mut hero2, AttributeKey::Air, 500);
        transfer::public_transfer(hero2, USER2);

        create_arena(&admin_cap, ts.ctx());

        ts.return_to_sender(admin_cap);
    };

    ts.next_tx(USER1);
    {
        let mut arena = ts.take_shared<FightArena>();
        let hero1 = ts.take_from_sender<Hero>();
        assert_eq(hero1.wins.length(), 0);
        add_hero_to_arena(&mut arena, USER1, hero1);
        ts::return_shared(arena);
    };

    ts.next_tx(USER2);
    {
        let mut arena = ts.take_shared<FightArena>();
        let hero2 = ts.take_from_sender<Hero>();
        assert_eq(hero2.wins.length(), 0);
        add_hero_to_arena(&mut arena, USER1, hero2);
        ts::return_shared(arena);
    };

    ts.next_tx(ADMIN);
    {
        let arena = ts.take_shared<FightArena>();
        let admin_cap = ts.take_from_sender<AdminCap>();
        fight(&admin_cap, arena);
        ts.return_to_sender(admin_cap);
    };

    ts.next_tx(USER1);
    {
        let mut hero1 = ts.take_from_sender<Hero>();
        
        assert_eq(hero1.wins.length(), 1);

        upgrade_attributes(&mut hero1);

        let earth = attribute_opt(&hero1.id, AttributeKey::Earth).destroy_or!(0);
        let fire = attribute_opt(&hero1.id, AttributeKey::Fire).destroy_or!(0);
        let water = attribute_opt(&hero1.id, AttributeKey::Water).destroy_or!(0);
        let air = attribute_opt(&hero1.id, AttributeKey::Air).destroy_or!(0);

        assert_eq(earth, 500);
        assert_eq(fire, 500);
        assert_eq(air, 500);
        assert_eq(water, 100);

        ts.return_to_sender(hero1);
    };
    
    ts.next_tx(USER2);
    {
        assert_eq(ts.has_most_recent_for_sender<Hero>(), false);
    };

    ts.end();
}
