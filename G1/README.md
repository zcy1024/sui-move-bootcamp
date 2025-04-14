# [G1]: Scenario Testing

In this section we will work with the implementation of scenario tests for our game's core components: Heroes, XP Tomes, and Access Control.

## Project Structure

The codebase consists of several key components:

1. `scenario/sources/hero.move` - Contains the Hero NFT implementation
2. `scenario/sources/xp_tome.move` - Contains the XP Tome implementation
3. `scenario/sources/acl.move` - Contains the Access Control List implementation
4. `scenario/tests/` - Contains test files for each component
5. `scenario/Move.toml` - Package configuration and dependencies

## Test Cases to Implement

There are four main test files to implement in this project:

### 1. ACL Initialization
In `acl.move`, implement:
- `init_for_testing` - Initialize the ACL system for testing purposes

### 2. Hero Tests
In `hero_tests.move`, implement the following test cases:
- `test_mint` - Verify that a Hero can be minted with the correct health and stamina values
- `test_level_up` - Verify that a Hero's stats increase correctly when using an XP Tome

### 3. XP Tome Tests
In `xp_tome_tests.move`, implement the following test case:
- `test_new_xp_tome` - Verify that an XP Tome can be created with the correct health and stamina values

### 4. ACL Tests
In `acl_tests.move`, implement the following test case:
- `test_add_admin` - Verify that new admins can be added and authorized correctly
