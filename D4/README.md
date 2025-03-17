## Sui & Move Bootcamp <> Programmable Transactions

This exercise contains a simple Node project using Typescript, that builds transaction blocks on the Sui blockchain, and profiles their gas usage.

On Sui, <i>[Programmable Transaction Blocks](https://docs.sui.io/concepts/transactions/prog-txn-blocks) are a lightweight and flexible way to allow a user to execute multiple commands (eg call multiple Move functions, manage their objects, and manage their coins) in a single transaction.</i>

### Quickstart

- Create a .env file in the `ptbs/` directory, following the structure of the .env.example
- Run the following commands:

```
cd ptbs
npm i
npm run test
```

Fill in the `src/tests/transferSUI.test.ts` test, so that it builds and dry runs a transaction for transfering a specific SUI amount to a recipient addresses.
