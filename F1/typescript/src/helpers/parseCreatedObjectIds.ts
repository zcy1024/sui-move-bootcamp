import { SuiObjectChange } from "@mysten/sui/client";

interface Args {
  objectChanges: SuiObjectChange[];
}

interface Response {
  weaponsIds: string[];
  heroesIds: string[];
}

/**
 * Parses the provided SuiObjectChange[].
 * Extracts the IDs of the created Heroes and Weapons NFTs, filtering by objectType.
 */
export const parseCreatedObjectsIds = ({ objectChanges }: Args): Response => {
  // TODO: Implement this function
  return {
    weaponsIds: [],
    heroesIds: [],
  };
};
