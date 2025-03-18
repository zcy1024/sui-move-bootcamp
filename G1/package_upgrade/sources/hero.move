module package_upgrade::hero;

use std::string::String;

use sui::dynamic_field as df;
use sui::dynamic_object_field as dof;
use sui::package;

use package_upgrade::blacksmith::{Shield, Sword};
use package_upgrade::version::Version;

const EAlreadyEquipedShield: u64 = 0;
const EAlreadyEquipedSword: u64 = 1;

public struct HERO() has drop;

/// Hero NFT
public struct Hero has key, store {
    id: UID,
    health: u64,
    stamina: u64,
}

fun init(otw: HERO, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
}

/// Anyone can mint a hero.
/// Hero starts with 100 heath and 10 stamina.
public fun mint_hero(version: &Version, ctx: &mut TxContext): Hero {
    version.check_is_valid();
    Hero {
        id: object::new(ctx),
        health: 100,
        stamina: 10
    }
}

/// Hero can equip a single sword.
/// Equiping a sword increases the `Hero`'s power by its attack.
public fun equip_sword(self: &mut Hero, version: &Version, sword: Sword) {
    version.check_is_valid();
    if (df::exists_(&self.id, b"sword".to_string())) {
        abort(EAlreadyEquipedSword)
    };
    self.add_dof(b"sword".to_string(), sword)
}

/// Hero can equip a single shield.
/// Equiping a shield increases the `Hero`'s power by its defence.
public fun equip_shield(self: &mut Hero, version: &Version, shield: Shield) {
    version.check_is_valid();
    if (df::exists_(&self.id, b"shield".to_string())) {
        abort(EAlreadyEquipedShield)
    };
    self.add_dof(b"shield".to_string(), shield)
}

public fun health(self: &Hero): u64 {
    self.health
}

public fun stamina(self: &Hero): u64 {
    self.stamina
}

/// Generic add dynamic object field to the hero.
fun add_dof<T: key + store>(self: &mut Hero, name: String, value: T) {
    dof::add(&mut self.id, name, value)
}

#[test_only]
use sui::test_scenario;

#[test_only]
use package_upgrade::{blacksmith, version};

#[test_only]
const EShouldHaveFailed: u64 = 0x100;

#[test]
#[expected_failure(abort_code=version::EInvalidPackageVersion)]
fun hero_mint_should_fail() {
    let sender = @0x11111;
    let mut scenario = test_scenario::begin(sender);
    init(HERO(), scenario.ctx());
    version::init_for_testing(scenario.ctx());

    scenario.next_tx(sender);
    let version = scenario.take_shared<Version>();
    let _hero = mint_hero(&version, scenario.ctx());
    abort(EShouldHaveFailed)
}

#[test]
fun dfs_should_use_custom_keys() {
    // use sui::{coin::{Self, Coin}, sui::SUI};

    let sender = @0x11111;
    let mut scenario = test_scenario::begin(sender);
    let publisher = package::claim(HERO(), scenario.ctx());
    version::init_for_testing(scenario.ctx());

    scenario.next_tx(sender);
    let blacksmith = blacksmith::new_blacksmith(&publisher, 100, scenario.ctx());
    let sword = blacksmith.new_sword(80, scenario.ctx());
    let attack = sword.attack();
    assert!(attack == 80);

    let version = scenario.take_shared<Version>();

    // let coin = coin::mint_for_testing<SUI>(5_000_000_000, scenario.ctx());
    // let mut hero = mint_hero_v2(&version, coin, scenario.ctx());
    let mut hero = mint_hero(&version, scenario.ctx());
    hero.equip_sword(&version, sword);
    assert!(!dof::exists_(&hero.id, b"sword".to_string()));
    // assert!(dof::exists_(&hero.id, SwordKey()));
    // assert!(*df::borrow(&hero.id, PowerKey()) == attack);

    transfer::public_transfer(publisher, sender);
    transfer::public_transfer(blacksmith, sender);
    transfer::public_transfer(hero, sender);
    test_scenario::return_shared(version);

    scenario.end();
}

