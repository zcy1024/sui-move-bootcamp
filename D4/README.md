## Sui & Move Bootcamp <> Programmable Transactions

This exercise contains a simple Node project using Typescript, that executes a simple transfer transaction block on the Sui blockchain.

On Sui, <i>[Programmable Transaction Blocks](https://docs.sui.io/concepts/transactions/prog-txn-blocks) are a lightweight and flexible way to allow a user to execute multiple commands (eg call multiple Move functions, manage their objects, and manage their coins) in a single transaction.</i>

### Quickstart

- Create a .env file in the `ptbs/` directory, following the structure of the .env.example
- Run the following commands:

```
cd ptbs
npm i
npm run test
```

### Instructions

- Notice that both of the tests in the `transferSUI.test.ts` file are failing:
  - `Transaction Status`: Validates that the status of the transfer transaction is "success".
  - `SUI Balance Changes`: Parses the balance changes and validate they have changed as expected
- Modify the `src/helpers/transferSUI.ts` and `src/helpers/parseBalanceChanges.ts` functions, so that both of the tests succeed.
