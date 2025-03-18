import { suiClient } from "../suiClient";

/**
 * Uses SuiClient to get a hero object by its ID.
 * Uses the required SDK options to include the content and the type of the object in the response.
 */
export const getHero = async (id: string) => {
  return suiClient.getObject({
    id,
    options: {
      showContent: true,
      showType: true,
    },
  });
};
