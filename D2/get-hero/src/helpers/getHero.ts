import { SuiObjectResponse } from "@mysten/sui/client";

/**
 * Uses SuiClient to get a hero object by its ID.
 * Uses the required SDK options to include the content and the type of the object in the response.
 */
export const getHero = async (id: string): Promise<SuiObjectResponse> => {
  // TODO: Implement this function
  return new Promise((resolve) => resolve({} as unknown as SuiObjectResponse));
};
