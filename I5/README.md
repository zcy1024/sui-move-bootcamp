# [I5]: Kiosk Rules

In this section we will work with the use of common Kiosk rules that are used to force royalties
when trading Swords.

## Project Structure

The codebase consists of several key components:

1. `src/publish.ts` - Handles rules and package publishing and policy creation
2. `src/kiosk.ts` - Implements kiosk-related operations
3. `src/create-sword.ts` - Contains functionality for creating new sword NFTs
4. `src/consts.ts` - Contains constants and configuration
5. `src/kiosk.test.ts` - Contains tests for kiosk operations

## Tasks to Complete

There are three main tasks to implement in this project:

### 1. Set Transfer Policy Rules
In `src/publish.ts`, implement the transfer policy rules in the `createPolicy` function. The policy should include:
- Personal kiosk rule
- Royalty rule
- Lock rule

### 2. Create Personal Kiosk
In `src/kiosk.ts`, implement the `createPersonalKiosk` function to make a kiosk personal. This involves:
- Creating a new kiosk
- Making it personal using the appropriate Move call(s)

### 3. Implement Purchase Rules
In `src/kiosk.ts`, complete the `purchase` function to handle sword purchases by:
- Putting the sword in the buyer's PersonalKiosk (personal_kiosk_rule)
- Locking the sword in the kiosk (kiosk_lock_rule)
- Paying royalties (royalty_rule)
