## Sui & Move Bootcamp <> End to End Decentralized Application | Typescript Integration Tests

This directory contains a simple Node project with Typescript, what will contain the integration tests of the E2E application.

### Quickstart

1. Create a `.env` file in the root of the node project, following the structure of the `.env.example`
2. `cd typescript`
3. Install the required npm dependencies with `npm i`
4. Validate your .env with `npm run dev`
5. Run your tests with `npm run test` / `npm run test:watch`

### Project Structure

```bash
typescript/
├── src/
│ ├── tests/ # Jest test cases, run with `npm run test`
│ │ ├── *.test.ts # any test case should have a .test.ts suffix
│ ├── env.ts # Reads & validates .env variables
│ ├── index.ts # Entry point, run with `npm run dev`
├── .env # Environment variables
├── .env.example # Example env file
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── jest.config.ts # Jest configuration
├── README.md # Project documentation
```

### Instructions

- Notice that all of the tests in the `e2e.test.ts` test file are failing:

  - `Transaction Status`: Validates that the status of the transfer transaction is "success".
  - `Created Hero`: Validates that a Hero NFT is created.
  - `Hero is equiped with a Weapon`: Validates that except for the Hero NFT, a Weapon NFT was also created, and that this Weapon NFT is wrapped inside a `Hero` NFT
  - `Heroes registry`: Validates that the Heroes registry already contains a few registrered Hero IDs

- Modify the functions `mintHeroWithWeapon`, `parseCreatedObjectsIds`, `getWeaponIdOfHero`, `getHeroesRegistry` (a detailed guide for each function can be found in the corresponding file), so that all of the tests succeed
