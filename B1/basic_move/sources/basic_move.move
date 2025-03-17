module basic_move::basic_move;

use sui::test_scenario;
use sui::test_utils::{destroy};

public struct Hero has key, store {
    id: UID
}


public fun mint_hero(ctx: &mut TxContext): Hero {
    let aHero = Hero {
        id: object::new(ctx)
    };
    aHero
}

#[test]
fun test_mint() {
    let mut test = test_scenario::begin(@0xCAFE);
    let hero = mint_hero(test.ctx());
    let obj_id = hero.id.to_inner();
    assert!(object::id(&hero) == obj_id, 0);
    destroy(hero);
    test.end();
}

