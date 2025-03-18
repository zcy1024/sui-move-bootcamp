import { SuiObjectResponse } from "@mysten/sui/client";

export interface Hero {
  id: string;
  health: string;
  stamina: string;
}

interface HeroContent {
  fields: {
    id: { id: string };
    health: string;
    stamina: string;
  };
}

/**
 * Parses the content of a hero object in a SuiObjectResponse.
 * Maps it to a Hero object.
 */
export const parseHeroContent = (objectResponse: SuiObjectResponse): Hero => {
  const content = objectResponse.data?.content as unknown as HeroContent;
  if (!content) {
    throw new Error("Empty hero content");
  }
  const hero: Hero = {
    id: content.fields.id.id,
    health: content.fields.health,
    stamina: content.fields.stamina,
  };
  return hero;
};
