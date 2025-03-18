import { SuiObjectResponse } from "@mysten/sui/client";

export interface Hero {
  id: string;
  name: string;
  stamina: number | null;
  category: {
    id: string;
    name: string;
  } | null;
  weapon: {
    id: string;
    name: string;
    destruction_power: number;
  } | null;
}

interface HeroContent {
  fields: {
    id: { id: string };
    name: string;
    stamina: string | null;
    weapon: {
      type: string;
      fields: {
        id: { id: string };
        name: string;
        destruction_power: string;
      };
    } | null;
    category: {
      type: string;
      fields: {
        id: { id: string };
        name: string;
      };
    } | null;
  };
}

/**
 * Parses the content of a hero object in a SuiObjectResponse.
 * Maps it to a Hero object.
 */
export const parseHeroContent = (objectResponse: SuiObjectResponse): Hero => {
  // TODO: Implement this function
  return {} as unknown as Hero;
};
