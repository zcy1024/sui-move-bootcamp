import { Transaction, TransactionArgument } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";

export const createHero = async (name: string, attributes: string[]) => {
  const signer = getSigner({ secretKey: ENV.SECRET_KEY });
  const tx = new Transaction();

  // create the attributes vector and pass it to the create_hero function

  return await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: signer,
  });
};

export const getHero = async (heroId: string) => {
  const hero = await suiClient.getObject({
    id: heroId,
    options: {
      showContent: true,
    },
  });
  return hero;
};
