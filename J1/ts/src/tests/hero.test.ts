import { adminTakeFees, userMintHero } from "../helpers/hero";

describe("Hero", () => {
  it("user should create hero and admin should take the fess", async () => {
    const heroResult = await userMintHero("Hero 1");
    console.log(heroResult.digest);
    expect(heroResult.effects?.status.status).toBe("success");
    const adminResult = await adminTakeFees();
    expect(adminResult.effects?.status.status).toBe("success");
    console.log(adminResult.digest);
  });
});
