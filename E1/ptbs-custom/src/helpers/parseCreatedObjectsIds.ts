import { SuiObjectChange, SuiObjectChangeCreated } from "@mysten/sui/client";

interface Args {
  objectChanges: SuiObjectChange[];
  targetType: string;
}

/**
 * Parses the provided SuiObjectChange[] and extracts the IDs of the created objects of the desired type.
 */
export const parseCreatedObjectsIds = ({
  objectChanges,
  targetType,
}: Args): string[] => {
  const createdObjects = objectChanges.filter(
    ({ type }) => type === "created"
  ) as SuiObjectChangeCreated[];
  const ids = createdObjects
    .filter(({ objectType }) => objectType === targetType)
    .map(({ objectId }) => objectId);
  return ids;
};
