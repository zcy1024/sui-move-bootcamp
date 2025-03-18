import { Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";

export const mintNFT = async () => {
  const tx = new Transaction();

  // TODO: Add the commands to the transaction

  return suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: getSigner({ secretKey: ENV.USER_SECRET_KEY }),
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  });
};
