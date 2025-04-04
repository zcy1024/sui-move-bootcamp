import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiParsedData } from "@mysten/sui/client";
import { useMemo } from "react";
import { HeroCard } from "./HeroCard";

export const HeroesList = () => {
  const { data, isLoading, isError } = useSuiClientQuery("getObject", {
    id: "0x1678dd23b8e348e2bd52753f268af04fda889cd5bb8736d1d6d6a92530344e7b",
    options: {
      showContent: true,
    },
  });

  const { counter, ids } = useMemo(() => {
    if (!data)
      return {
        counter: 0,
        ids: [],
      };
    const content = data.data?.content as Extract<
      SuiParsedData,
      {
        dataType: "moveObject";
      }
    >;
    const { counter, ids } = content?.fields as {
      counter: string;
      id: { id: string };
      ids: string[];
    };
    return {
      counter: parseInt(counter),
      ids: ids,
    };
  }, [data]);

  const {
    data: heroes,
    isLoading: isHeroesLoading,
    isError: isHeroesError,
  } = useSuiClientQuery("multiGetObjects", {
    ids: ids,
    options: {
      showContent: true,
    },
  });

  if (isLoading || isHeroesLoading) return <div>Loading...</div>;
  if (isError || isHeroesError) return <div>Error loading data</div>;
  if (!data || !heroes?.length) return <div>No data found</div>;

  return (
    <div>
      <div>Found {counter} Heroes!</div>
      <div>
        {heroes.map((hero) => {
          if (!hero.data) return null;
          return (
            <HeroCard
              key={hero.data.objectId}
              objectId={hero.data.objectId}
              content={
                hero.data.content as Extract<
                  SuiParsedData,
                  { dataType: "moveObject" }
                >
              }
            />
          );
        })}
      </div>
    </div>
  );
};
