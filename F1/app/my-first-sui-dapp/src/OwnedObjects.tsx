import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { HeroCard } from "./HeroCard";
import { SuiParsedData } from "@mysten/sui/client";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      filter: {
        StructType:
          "0x639b81953dd3790ceaee2721bb5608517d101ef1911062d48bf0726296251e11::hero::Hero",
      },
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!account,
    },
  );

  if (!account) {
    return;
  }

  if (error) {
    return <Flex>Error: {error.message}</Flex>;
  }

  if (isPending || !data) {
    return <Flex>Loading...</Flex>;
  }

  return (
    <Flex direction="column" my="2">
      {data.data.length === 0 ? (
        <Text>No heroes owned by the connected wallet</Text>
      ) : (
        <Heading size="4">Heroes owned by the connected wallet</Heading>
      )}
      {data.data.map(({ data }) => {
        if (!data) return null;
        return (
          <HeroCard
            key={data.objectId}
            objectId={data.objectId}
            content={
              data.content as Extract<SuiParsedData, { dataType: "moveObject" }>
            }
          />
        );
      })}
    </Flex>
  );
}
