import { Transaction } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";

const HERO_MINT_FEE = 100_000_000;

export const userMintHero = async (name: string) => {
  const userSigner = getSigner({ secretKey: ENV.USER_SECRET_KEY });

  let suiCoins = await suiClient.getCoins({
    owner: userSigner.toSuiAddress(),
  });

  const tx = new Transaction();

  const feeCoin = tx.splitCoins(tx.gas, [HERO_MINT_FEE]);

  tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::mint_hero`,
    arguments: [
      tx.pure.string(name),
      feeCoin,
      tx.object(ENV.TREASURY_ID),
      tx.object(ENV.CLOCK_ID),
    ],
  });

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: userSigner,
  });

  await suiClient.waitForTransaction({
    digest: result.digest,
  });

  return result;
};

export const adminTakeFees = async () => {
  const adminSigner = getSigner({ secretKey: ENV.ADMIN_SECRET_KEY });

  const tx = new Transaction();

  tx.moveCall({
    target: `${ENV.PACKAGE_ID}::hero::take_fees`,
    arguments: [
      tx.object(ENV.FEE_CAP_ID),
      tx.object(ENV.TREASURY_ID),
      tx.object(ENV.CLOCK_ID),
    ],
  });

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: adminSigner,
  });

  await suiClient.waitForTransaction({
    digest: result.digest,
  });

  return result;
};
