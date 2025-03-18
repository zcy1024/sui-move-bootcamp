
module sui_primitives::sui_primitives {

    #[test]
    fun test_numbers() {
        let a = 50;
        let b = 50;
        assert!(a == b, 601);

    }

    #[test]
    fun test_overflow() {
        let a = 500;
        let b = 500;

        assert!(1000 == 1000u16, 604) ;
    }

    #[test]
    fun test_mutability() {

    }

    #[test]
    fun test_boolean(){

    }

    #[test]
    fun test_loop(){

    }

    #[test]
    fun test_vector(){
        let mut myVec: vector<u8> = vector[10, 20, 30];

        assert!(myVec.is_empty() == true);
    }

    use std::string::{String};

    #[test]
    fun test_string(){
        let myStringArr : vector<u8>    = b"Hello, World!";


    }

    #[test]
    fun test_string2(){
        let myStringArr = b"Hello, World!";

    }

}
