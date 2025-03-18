## Sui & Move Bootcamp <> Advanced Programmable Transactions

This exercise contains a simple Node project using Typescript, that executes an advanced transaction block on the Sui blockchain, to mint a custom NFT.

### Quickstart

- Create a .env file in the `mint-hero/` directory, following the structure of the .env.example
- Run the following commands:

```
cd mint-hero
npm i
npm run test
```

### Instructions

- Notice that both of the tests in the `mintHero.test.ts` file are failing:
  - `Transaction Status`: Validates that the status of the transfer transaction is "success".
  - `Created Hero`: Parses the object changes and validates that only 1 Hero NFT is created.
- Modify the functions `src/helpers/mintHero.ts` and `src/helpers/parseCreatedHeroesIds.ts` functions, so that both of the tests succeed.
