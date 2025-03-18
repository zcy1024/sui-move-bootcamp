import { SuiObjectChange, SuiObjectChangeCreated } from "@mysten/sui/client";
import { ENV } from "../env";

interface Args {
  objectChanges: SuiObjectChange[];
}

interface Response {
  swordsIds: string[];
  heroesIds: string[];
}

/**
 * Parses the provided SuiObjectChange[].
 * Extracts the IDs of the created Heroes and Swords NFTs, filtering by objectType.
 */
export const parseCreatedObjectsIds = ({ objectChanges }: Args): Response => {
  // TODO: Implement this function
  return {
    swordsIds: [],
    heroesIds: [],
  };
};
