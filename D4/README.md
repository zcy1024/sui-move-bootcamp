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

- The transferSui.test.ts test is calling the function defined in the `src/helpers/transferSUI.ts`, to transfer a specified amount of SUI tokens to a specified recipient address.
- Fill in the function, so that the test passes.
