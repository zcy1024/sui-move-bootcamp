import { SuiObjectChange, SuiObjectChangeCreated } from "@mysten/sui/client";
import { ENV } from "../env";

interface Args {
  objectChanges: SuiObjectChange[];
}

/**
 * Parses the provided SuiObjectChange[].
 * Extracts the IDs of the created Heroes, filtering by objectType.
 */
export const parseCreatedHeroesIds = ({ objectChanges }: Args): string[] => {
  // TODO: Implement this function
  return [];
};
