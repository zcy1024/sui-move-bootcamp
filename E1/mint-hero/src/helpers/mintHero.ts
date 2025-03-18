import { Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";
import { getAddress } from "./getAddress";

/**
 * Builds, signs, and executes a transaction for minting a hero NFT
 */
export const mintHero = async () => {
  const tx = new Transaction();

  const hero = tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::mint_hero`,
    arguments: [tx.object(ENV.VERSION_ID)],
  });
  tx.transferObjects(
    [hero],
    getAddress({ secretKey: ENV.USER_SECRET_KEY })
  );

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: getSigner({ secretKey: ENV.USER_SECRET_KEY }),
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  });
};
