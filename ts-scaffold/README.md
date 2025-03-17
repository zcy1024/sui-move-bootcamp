## Sui & Move Bootcamp

This is a simple Node project with Typescript, that:

- reads and validates the .env variables using [dotenv](https://www.npmjs.com/package/dotenv) and [env-cmd](https://www.npmjs.com/package/env-cmd)
- runs tests with [Jest](https://jestjs.io/)
- communicates with the Sui blockchain using [@mysten/sui](https://www.npmjs.com/package/@mysten/sui)

### Prerequisites

Ensure you have installed locally:

- [node + npm](https://nodejs.org/en)
- [typescript](https://www.npmjs.com/package/typescript)

### Quickstart

1. Create a `.env` file in the root of the node project, following the structure of the `.env.example`
2. Install the required npm dependencies with `npm i`
3. Validate your .env with `npm run dev`
4. Run your tests with `npm run test` / `npm run test:watch`

### Project Structure

- `.env.example`: The scaffold of the env file (you need to create the `.env` file here as well)
- `src/`:
  - `env.ts`: Parse the .env variables, validate them with zod, and export them
  - `tests/`: The Jest tests. Ensure that you keep a `*.test.ts` prefix
