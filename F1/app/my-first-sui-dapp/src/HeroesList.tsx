import { useSuiClientQuery } from "@mysten/dapp-kit";
import { SuiParsedData } from "@mysten/sui/client";

export const HeroesList = () => {
  const { data, isLoading, isError } = useSuiClientQuery(
    "getObject",
    {
      id: import.meta.env.VITE_HEROES_REGISTRY_ID,
      options: {
        showContent: true,
      },
    },
    {
      select: (data) => {
        if (!data.data) {
          return [];
        }
        const content = data.data?.content as Extract<
          SuiParsedData,
          { dataType: "moveObject" }
        >;
        const fields = content.fields as { ids: string[] };
        return fields.ids;
      },
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Could not get heroes registry...</div>;
  }

  return (
    <div>
      <div>Found {data.length} Heroes.</div>
      {data.map((heroId) => (
        <div key={heroId}>{heroId}</div>
      ))}
    </div>
  );
};
