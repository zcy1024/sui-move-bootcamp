import { ENV } from "../env";
import { getOwnedHeroesIds } from "../helpers/getOwnedHeroesIds";

test("Owned Heroes Number", async () => {
  const ownedHeroesIds = await getOwnedHeroesIds(ENV.USER_ADDRESS);
  expect(ownedHeroesIds.length).toBe(101);
});
