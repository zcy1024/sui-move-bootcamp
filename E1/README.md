## Sui & Move Bootcamp <> Advanced Programmable Transactions

This exercise contains a simple Node project using Typescript, that executes an advanced transaction block on the Sui blockchain, to mint a custom NFT.

### Quickstart

- Create a .env file in the `ptbs-custom/` directory, following the structure of the .env.example
- Run the following commands:

```
cd ptbs-custom
npm i
npm run test
```

### Instructions

- Notice that both of the tests in the `mintNFT.test.ts` file are failing:
  - `Transaction Status`: Validates that the status of the transfer transaction is "success".
  - `Created Object Ids`: Parses the object changes and validates that only 1 NFT of the wanted type is created.
- Modify the `src/helpers/mintNFT.ts` and `src/helpers/parseCreatedObjectsIds.ts` functions, so that both of the tests succeed.
