## Sui & Move Bootcamp <> End to End Decentralized Application | Typescript Integration Tests

This directory contains a simple Node project with Typescript, what will contain the integration tests of the E2E application.

### Quickstart

1. Create a `.env` file in the root of the node project, following the structure of the `.env.example`
2. Install the required npm dependencies with `npm i`
3. Validate your .env with `npm run dev`
4. Run your tests with `npm run test` / `npm run test:watch`

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
