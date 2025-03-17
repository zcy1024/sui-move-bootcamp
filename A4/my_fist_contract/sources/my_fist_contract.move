
module my_fist_contract::simple_nft {

    use std::string::{String};
    use sui::transfer::{public_transfer};

    /// An object that contains an arbitrary string
    public struct Hero has key, store {
        id: UID,
        /// A string contained in the object
        name: String
    }

    #[lint_allow(self_transfer)]
    public fun mint(name_param: String, ctx: &mut TxContext) {
        let object = Hero {
            id: object::new(ctx),
            name: name_param
        };
        public_transfer(object, tx_context::sender(ctx));
    }

}