import { newAdmin } from "./../../../../../C1/ts/src/helper/hero";
import { Transaction, TransactionArgument } from "@mysten/sui/transactions";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { ENV } from "../env";

export const createHero = async (name: string, attributes: any[]) => {
  const signer = getSigner({ secretKey: ENV.SECRET_KEY });
  const tx = new Transaction();

  let attributesMap = tx.moveCall({
    target: `0x2::vec_map::empty`,
    typeArguments: [`${ENV.PACKAGE_ID}::vecmap_hero::Attribute`, "bool"],
  });

  attributes.forEach((attr) => {
    let attribute = tx.moveCall({
      target: `${ENV.PACKAGE_ID}::vecmap_hero::create_attribute`,
      arguments: [tx.pure.string(attr.name), tx.pure.u64(1)],
    });

    tx.moveCall({
      target: `0x2::vec_map::insert`,
      arguments: [attributesMap, attribute, tx.pure.bool(attr.active)],
      typeArguments: [`${ENV.PACKAGE_ID}::vecmap_hero::Attribute`, "bool"],
    });
  });

  const hero = tx.moveCall({
    target: `${ENV.PACKAGE_ID}::vecmap_hero::create_hero`,
    arguments: [tx.pure.string(name), attributesMap],
  });

  tx.moveCall({
    target: `${process.env.PACKAGE_ID}::vecmap_hero::transfer_hero`,
    arguments: [hero, tx.pure.address(signer.toSuiAddress())],
  });

  const result = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    options: {
      showObjectChanges: true,
      showEffects: true,
    },
    signer: signer,
  });

  await suiClient.waitForTransaction({
		digest: result.digest,
	});

  return result;
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
