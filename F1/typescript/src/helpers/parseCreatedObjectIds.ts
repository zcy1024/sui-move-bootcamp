import { SuiObjectChange, SuiObjectChangeCreated } from "@mysten/sui/client";
import { ENV } from "../env";

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
  const createdObjects = objectChanges.filter(
    ({ type }) => type === "created"
  ) as SuiObjectChangeCreated[];
  const weaponsIds = createdObjects
    .filter(
      ({ objectType }) => objectType === `${ENV.PACKAGE_ID}::hero::Weapon`
    )
    .map(({ objectId }) => objectId);
  const heroesIds = createdObjects
    .filter(({ objectType }) => objectType === `${ENV.PACKAGE_ID}::hero::Hero`)
    .map(({ objectId }) => objectId);
  return {
    weaponsIds,
    heroesIds,
  };
};
