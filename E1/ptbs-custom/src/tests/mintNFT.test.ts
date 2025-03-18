import { SuiTransactionBlockResponse } from "@mysten/sui/client";
import { mintNFT } from "../helpers/mintNFT";
import { parseCreatedObjectsIds } from "../helpers/parseCreatedObjectsIds";
import { ENV } from "../env";

describe("Mint an NFT", () => {
  let txResponse: SuiTransactionBlockResponse;

  beforeAll(async () => {
    txResponse = await mintNFT();
    console.log("Executed transaction with txDigest:", txResponse.digest);
  });

  test("Transaction Status", async () => {
    expect(txResponse.effects).toBeDefined();
    expect(txResponse.effects!.status.status).toBe("success");
  });

  test("Created Object Ids", () => {
    expect(txResponse.objectChanges).toBeDefined();
    const createdObjectsIds = parseCreatedObjectsIds({
      objectChanges: txResponse.objectChanges!,
      targetType: `${ENV.PACKAGE_ID}::nft:: NFT`,
    });
    expect(createdObjectsIds.length).toBe(1);
  });
});
