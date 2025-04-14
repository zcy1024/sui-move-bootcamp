# [I4]: Sword trading

In this section we will work with the implementation of a marketplace for trading Swords using Kiosk.

## Sword Contract

The Sword contract (`sword.move`) is a simple NFT implementation that creates swords with the following properties:
- Name
- Damage value
- Special effects (as a vector of strings)
- Display metadata (name, image URL, description)

## Project Structure

The codebase consists of several key components:

1. `src/publish.ts` - Handles package publishing and policy creation
2. `src/kiosk.ts` - Implements kiosk-related operations
3. `src/consts.ts` - Contains constants and configuration
4. `src/kiosk.test.ts` - Contains tests for kiosk operations

## Tasks to Complete

There are four main tasks to implement in this project:

### 1. Create Transfer Policy
In `src/publish.ts`, implement the `createPolicy` function to create an empty TransferPolicy for the Sword NFT.

### 2. Create Kiosk
In `src/kiosk.ts`, implement the `createKiosk` function to create a new kiosk.

### 3. Place and List Items
In `src/kiosk.ts`, implement the `placeAndListInKiosk` function to:
- Place a sword in a kiosk
- List it for sale at a specified price

### 4. Implement Purchase
In `src/kiosk.ts`, complete the `purchase` function to:
- Buy a sword from a kiosk
- Transfer it to the buyer's address
