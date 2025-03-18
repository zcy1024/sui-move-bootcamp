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
  const content = objectResponse.data?.content as unknown as HeroContent;
  if (!content) {
    throw new Error("Object content is missing");
  }
  const fields = content.fields;
  const weaponFields = fields.weapon?.fields;
  const categoryFields = fields.category?.fields;
  const hero: Hero = {
    id: (fields.id as { id: string }).id,
    name: fields.name,
    stamina: fields.stamina ? parseInt(fields.stamina, 10) : null,
    category: categoryFields
      ? {
          id: categoryFields.id.id,
          name: categoryFields.name,
        }
      : null,
    weapon: weaponFields
      ? {
          id: weaponFields.id.id,
          name: weaponFields.name,
          destruction_power: parseInt(weaponFields.destruction_power, 10),
        }
      : null,
  };
  return hero;
};
