import { suiClient } from "../suiClient";
import { Transaction } from "@mysten/sui/transactions";
import { getSigner } from "./getSigner";

export const getHeroWithDisplay = async (id: string) => {
  // get object with display
};

export const updateHeroDisplay = async (
  id: string,
  key: string,
  value: string,
  senderSecretKey: string
) => {
  const signer = getSigner({ secretKey: senderSecretKey });

  // update display
};
