module vecmap_hero::vecmap_hero;

use std::string::String;
use sui::vec_map::VecMap;

public struct Attribute has copy, drop, store {
    name: String,
    level: u64,
}

public struct Hero has key {
    id: UID,
    name: String,
    attributes: VecMap<Attribute, bool>,
}

public fun create_hero(
    name: String,
    attributes: VecMap<Attribute, bool>,
    ctx: &mut TxContext,
): Hero {
    let hero = Hero {
        id: object::new(ctx),
        name,
        attributes,
    };

    hero
}

public fun create_attribute(name: String, level: u64): Attribute {
    Attribute { name, level }
}

public fun transfer_hero(hero: Hero, to: address) {
    transfer::transfer(hero, to);
}

// Read Only
public fun is_attribute_active(hero: &Hero, name: String): bool {
    let matching_attribute = hero.attributes.keys().filter!(|attribute| attribute.name == name);
    match (!matching_attribute.is_empty()) {
        true => *hero.attributes.get(&matching_attribute[0]),
        _ => false,
    }
}

// Test Only

#[test_only]
use sui::vec_map;
#[test_only]
use sui::test_utils::{assert_eq, destroy};

#[test]
public fun test_is_attribute_active() {
    let mut attributes = vec_map::empty();
    attributes.insert(Attribute { name: b"Active".to_string(), level: 1 }, true);
    attributes.insert(Attribute { name: b"Inactive".to_string(), level: 1 }, false);

    let hero = create_hero(b"Hero 1".to_string(), attributes, &mut tx_context::dummy());

    assert_eq(is_attribute_active(&hero, b"Active".to_string()), true);
    assert_eq(is_attribute_active(&hero, b"Inactive".to_string()), false);
    assert_eq(is_attribute_active(&hero, b"Absent".to_string()), false);

    destroy(hero);
}
