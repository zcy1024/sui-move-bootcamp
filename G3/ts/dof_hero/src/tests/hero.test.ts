import {
  adminCreateHero,
  adminCreateArena,
  getHero,
  userAddHeroToTheArena,
  adminDeleteArena,
  getArena,
} from "../helpers/hero";

describe("Hero", () => {
  it("should create a hero add them to the arena and verify that it's still accessible off-chain", async () => {
    const heroResult = await adminCreateHero("Hero 1");
    expect(heroResult.effects?.status.status).toBe("success");
    expect(heroResult.effects?.created?.length).toBe(1);
    const hero = heroResult.effects?.created?.[0];
    expect(hero).toBeDefined();
    const heroId = hero?.reference.objectId!;

    const arenaResult = await adminCreateArena();
    expect(arenaResult.effects?.status.status).toBe("success");
    expect(arenaResult.effects?.created?.length).toBe(1);
    const arena = arenaResult.effects?.created?.[0];
    expect(arena).toBeDefined();
    const arenaId = arena?.reference.objectId!;

    const userAddHeroToTheArenaResult = await userAddHeroToTheArena(
      arenaId,
      heroId
    );
    expect(userAddHeroToTheArenaResult.effects?.status.status).toBe("success");

    const heroData = await getHero(heroId);
    // @ts-ignore
    expect(heroData.data?.content?.fields?.name).toBe("Hero 1");
  });

  it("should create a hero add them to the arena delete the areana abd verify the orphan object", async () => {
    const heroResult = await adminCreateHero("Hero 1");
    expect(heroResult.effects?.status.status).toBe("success");
    expect(heroResult.effects?.created?.length).toBe(1);
    const hero = heroResult.effects?.created?.[0];
    expect(hero).toBeDefined();
    const heroId = hero?.reference.objectId!;

    const arenaResult = await adminCreateArena();
    expect(arenaResult.effects?.status.status).toBe("success");
    expect(arenaResult.effects?.created?.length).toBe(1);
    const arena = arenaResult.effects?.created?.[0];
    expect(arena).toBeDefined();
    const arenaId = arena?.reference.objectId!;

    const userAddHeroToTheArenaResult = await userAddHeroToTheArena(
      arenaId,
      heroId
    );
    expect(userAddHeroToTheArenaResult.effects?.status.status).toBe("success");

    const adminDeleteArenaResult = await adminDeleteArena(arenaId);
    expect(adminDeleteArenaResult.effects?.status.status).toBe("success");

    const arenaData = await getArena(arenaId);
    // @ts-ignore
    expect(arenaData.error?.code).toBe("deleted");

    const heroData = await getHero(heroId);
    // @ts-ignore
    expect(heroData.data?.content?.fields?.name).toBe("Hero 1");
  });
});
