# [G1]: Scenario Testing

In this section we will work with the implementation of scenario tests for our game's core components: Heroes, XP Tomes, and Access Control.

## Project Overview

This project implements a simple game system with three main components:

1. **Access Control List (ACL)** - Manages administrative permissions
2. **Hero NFTs** - Represent player characters with health and stamina stats
3. **XP Tomes** - Consumable items that can level up Heroes

## Module Details

### 1. Access Control List (acl.move)
The ACL module manages administrative permissions through:
- `AdminCap` - A capability token that allows adding/removing admins
- `Admins` - A shared object containing the list of authorized admin addresses
- Key functions:
  - `init` - Initializes the ACL system and creates the first admin
  - `add_admin` - Adds a new admin address
  - `remove_admin` - Removes an admin address
  - `authorize` - Verifies if an address has admin privileges

### 2. Hero NFTs (hero.move)
The Hero module implements character NFTs with:
- `Hero` struct containing:
  - `health` - The hero's health points
  - `stamina` - The hero's stamina points
- Key functions:
  - `mint` - Creates new Hero NFTs (admin-only)
  - `level_up` - Increases hero stats using XP Tomes
  - `health`/`stamina` - Getter functions for hero stats

### 3. XP Tomes (xp_tome.move)
The XP Tome module implements consumable items that:
- `XPTome` struct containing:
  - `health` - Health points to add to a hero
  - `stamina` - Stamina points to add to a hero
- Key functions:
  - `new` - Creates new XP Tomes (admin-only)
  - `destroy` - Consumes the tome and returns its stats
  - `health`/`stamina` - Getter functions for tome stats

## Module Interactions

1. **Admin Control Flow**:
   - ACL system controls who can mint Heroes and XP Tomes
   - Only addresses in the `Admins` list can create new assets
   - `AdminCap` holders can modify the admin list

2. **Hero Leveling System**:
   - Heroes can be leveled up by consuming XP Tomes
   - When a tome is used, its stats are added to the hero's stats
   - The tome is destroyed in the process

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
