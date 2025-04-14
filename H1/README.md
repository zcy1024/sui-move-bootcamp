# [H1]: Package Upgrades

In this section we will work with upgrading a published package that implements a game with Heroes, Swords, and Shields.

## Package Overview

The package `package_upgrade` consists of the following modules:

### blacksmith
Module `blacksmith` involves the `Blacksmith` capability object which can create `Sword`s and `Shield`s.

### hero
A `Hero` is a freely mintable NFT which can equip `Sword` and `Shield` under the dynamic field keys `"sword"` and `"shield"`.

### admin
Includes the `AdminCap` used to create `Blacksmith` capability objects.

### package_version
Uses the [Versioned Shared Objects](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade#versioned-shared-objects) pattern to enable deprecation of functions defined in previous package version.

## Project Structure

The codebase consists of several key components:

1. `package_upgrade/sources/hero.move` - Contains the Hero NFT implementation
2. `package_upgrade/sources/blacksmith.move` - Contains the Blacksmith and item implementations
3. `package_upgrade/sources/version.move` - Contains version management for package upgrades
4. `package_upgrade/sources/admin.move` - Contains admin capabilities
5. `package_upgrade/Move.toml` - Package configuration and dependencies

## Tasks to Complete

There are four main tasks to implement in this project:

### 1. Update Package Version
In `version.move`, update:
- Bump the `VERSION` constant to 2
- Update the `Version` shared object's version field to 2

### 2. Implement Hero Purchase
In `hero.move`, modify the hero creation to:
- Replace free minting with a purchase system
- Set the price to 5 SUI
- Create a new `mint_hero_v2` function that accepts payment

### 3. Add Type-Safe Equipment Keys
In `hero.move`, implement:
- New structs for sword and shield equipment keys
- Update the equipment functions to use these type-safe keys instead of strings

### 4. Add Hero Power
In `hero.move`, add:
- A `power` field to the `Hero` struct
- Logic to increase power when equipping swords (by attack value) or shields (by defense value)

## Useful Links

- [Package Upgrades Documentation](https://docs.sui.io/concepts/sui-move-concepts/packages/upgrade)

### TODO
- Diagram depicting versioned shared object logic
- Where to use &version as input?