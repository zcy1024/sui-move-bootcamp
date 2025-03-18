## Sui & Move Bootcamp <> Sui TS SDK | Read Queries I

This exercise contains a simple Node project using Typescript, that reads the contents of an NFT on the Sui blockchain.

### Quickstart

- Create a .env file in the `get-hero/` directory, following the structure of the .env.example
- Run the following commands:

```
cd read
npm i
npm run test
```

### Instructions

- Notice that both of the tests in the `getHero.test.ts` file are failing:
  - `Hero Exists`: Validates that the Hero object is found on chain by its Object ID
  - `Hero Content`: Validates the content of the Hero object has the expected structure
  - `Hero Has Attached Swords`: Validates that the Hero object has a Sword attached to it
- Modify the functions, so that both of the tests succeed:
  - `src/helpers/getHero.ts`: gets a hero object by its Object ID
  - `src/helpers/parseHeroContent.ts`: Parses the content of a hero object in a SuiObjectResponse and maps it to a Hero object.
  - `src/helpers/getHeroSwordIds.ts`: Parses the Dynamic Object Fields of a Hero object, and keeps the ids of the Swords
