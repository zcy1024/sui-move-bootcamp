import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { mintHero } from "../helpers/mintHero";
import { parseCreatedHeroesIds } from "../helpers/parseCreatedHeroesIds";
import { ENV } from "../env";

describe("Mint a Hero NFT", () => {
  let txResponse: SuiTransactionBlockResponse;

  beforeAll(async () => {
    txResponse = await mintHero();
    console.log("Executed transaction with txDigest:", txResponse.digest);
  });

  test("Transaction Status", () => {
    expect(txResponse.effects).toBeDefined();
    expect(txResponse.effects!.status.status).toBe("success");
  });

  test("Created Hero", () => {
    expect(txResponse.objectChanges).toBeDefined();
    const createdObjectsIds = parseCreatedHeroesIds({
      objectChanges: txResponse.objectChanges!,
    });
    expect(createdObjectsIds.length).toBe(1);
  });
});
