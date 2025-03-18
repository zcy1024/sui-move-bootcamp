import { SuiObjectResponse } from "@mysten/sui/client";
import { getHero } from "../helpers/getHero";
import { Hero, parseHeroContent } from "../helpers/parseHeroContent";
import { ENV } from "../env";

const HERO_OBJECT_ID =
  "0x66791f5e262d5a92fb26120afa6bd11ba84b9ac0cb7fecdbbed0565238b1e02f";

describe("Get Hero", () => {
  let objectResponse: SuiObjectResponse;

  beforeAll(async () => {
    objectResponse = await getHero(HERO_OBJECT_ID);
  });

  test("Hero Exists", () => {
    expect(objectResponse.data).toBeDefined();
    expect(objectResponse.data!.objectId).toBeDefined();
    expect(objectResponse.data!.type).toBe(
      `${ENV.PACKAGE_ID}::basic_move::Hero`
    );
  });

  test("Hero Content", () => {
    const hero: Hero = parseHeroContent(objectResponse);
    expect(hero.id).toBe(HERO_OBJECT_ID);
    expect(hero.stamina).toBeNull();
    expect(hero.category).toBeNull();
    expect(hero.name).toBeDefined();
    expect(hero.weapon).toBeDefined();
    expect(hero.weapon!.name).toBeDefined();
    expect(hero.weapon!.destruction_power).toBeDefined();
  });
});
