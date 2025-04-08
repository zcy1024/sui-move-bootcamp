import { ENV } from "../env";
import { createHero, getHero } from "../helpers/hero";

describe("Hero", () => {
  it("should create a hero with attributes", async () => {
    const result = await createHero("Hero 1", [
      { name: "fire", active: true },
      { name: "water", active: true },
      { name: "earth", active: false },
      { name: "air", active: false },
    ]);
    expect(result.effects?.status.status).toBe("success");
    expect(result.effects?.created?.length).toBe(1);

    let hero = result.effects?.created?.[0];
    expect(hero).toBeDefined();

    const heroData = await getHero(hero?.reference.objectId!);
    expect(heroData).toBeDefined();
    // @ts-ignore
    expect(heroData.data?.content?.fields.name).toBe("Hero 1");
    expect(
      // @ts-ignore
      heroData.data?.content?.fields.attributes.fields.contents.length
    ).toBe(4);

    const attributes =
      // @ts-ignore
      heroData.data?.content?.fields.attributes.fields.contents;
    expect(attributes).toBeDefined();
    expect(attributes?.length).toBe(4);

    const expectedAttributes = [
      { name: "fire", value: true },
      { name: "water", value: true },
      { name: "earth", value: false },
      { name: "air", value: false },
    ];

    expect(attributes).toEqual(
      expect.arrayContaining(
        expectedAttributes.map(({ name, value }) =>
          expect.objectContaining({
            fields: {
              key: {
                fields: {
                  level: "1",
                  name: name,
                },
                type: `${ENV.PACKAGE_ID}::vecmap_hero::Attribute`,
              },
              value: value,
            },
            type: `0x2::vec_map::Entry<${ENV.PACKAGE_ID}::vecmap_hero::Attribute, bool>`,
          })
        )
      )
    );
  });
});
