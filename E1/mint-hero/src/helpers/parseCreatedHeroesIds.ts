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
  const createdObjects = objectChanges.filter(
    ({ type }) => type === "created"
  ) as SuiObjectChangeCreated[];
  const ids = createdObjects
    .filter(({ objectType }) => objectType === `${ENV.PACKAGE_ID}::hero::Hero`)
    .map(({ objectId }) => objectId);
  return ids;
};
