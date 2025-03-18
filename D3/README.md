## Sui & Move Bootcamp <> SUI TS SDK | Read Queries II

This exercise contains a simple Node project using Typescript, that gets all of the Heroes NFTs owned by a specific address on chain, iterating over the full node's pagination.

### Quickstart

- Create a .env file in the `get-heroes/` directory, following the structure of the .env.example
- Run the following commands:

```
cd get-heroes
npm i
npm run test
```

### Instructions

- Notice that the test in the `getHeroes.test.ts` file is failing:
  - `Owned Heroes Number`: Validates that the amount of the owned Heroes is exactly 101.
- Modify the function of the file `src/helpers/getOwnedHeroesIds.ts` so that it fetches <b>all</b> of the owned Heroes by the address provided in the .env.
