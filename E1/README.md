## Sui & Move Bootcamp <> Advanced Programmable Transactions

This exercise contains a simple Node project using Typescript, that executes an advanced transaction block on the Sui blockchain, to mint a Hero NFT and a Sword NFT, and attach the Sword to the Hero as a Dynamic Object Field.

### Quickstart

- Create a .env file in the `mint-hero/` directory, following the structure of the .env.example
- Run the following commands:

```
cd mint-hero
npm i
npm run test
```

### Instructions

- Notice that both of the tests in the `mintHeroWithSword.test.ts` file are failing:
  - `Transaction Status`: Validates that the status of the transfer transaction is "success".
  - `Created Hero And Sword`: Validates that a Hero NFT and a Sword NFT are created.
  - `Hero is equiped with a Sword`: Validates that our Hero is equiped with a Sword.
- Modify the functions `src/helpers/mintHeroWithSword.ts` and `src/helpers/parseCreatedObjectsIds.ts` functions, so that both of the tests succeed.
