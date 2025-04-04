## Sui & Move Bootcamp <> End to End Decentralized Application | Smart Contracts

This directory contains the smart contracts for the End to End Decentralized Application.
We will need just a simple package, containing a single module, named `hero`.

### Quickstart

```
cd move/hero
sui move build
sui move test
```

### Project Structure

The source code is organized as follows:

```bash
move/
├── hero/
│ ├── sources/
│ │ ├── hero.move # The source code of the hero module
│ ├── tests/
│ ├── hero_tests.move # The unit tests for the hero module
├── Move.lock
├── Move.toml
├── README.md # Project documentation
```

### Instructions

- After running `sui move test`, you will notice that all of the tests are failing.
- We need to fill in the bodies of the functions, so that the tests pass.
- After filling in the code, publish the package on testnet with:

```
cd move/hero
sui client switch --env <your-cli-alias-for-testnet>
sui client publish
```

- Keep the `txDigest` of the publish transaction's output, and get ready jump into the Typescript parts of the exercise!
