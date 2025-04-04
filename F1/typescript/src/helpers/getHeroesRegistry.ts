interface HeroesRegistry {
  ids: string[];
  counter: number;
}
/**
 * Gets the Heroes ids in the Hero Registry.
 * We need to get the Hero Registry object, and return the contents of the ids vector.
 */
export const getHeroesRegistry = async (): Promise<HeroesRegistry> => {
  // TODO: Implement this function
  return {
    ids: [],
    counter: 0,
  };
};
