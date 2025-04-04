import { SuiParsedData } from "@mysten/sui/client";

export const HeroCard = ({
  content,
  objectId,
}: {
  objectId: string;
  content: Extract<SuiParsedData, { dataType: "moveObject" }>;
}) => {
  const fields = content.fields as {
    name: string;
    stamina: string;
  };
  return (
    <div style={{ marginBottom: "16px" }}>
      <div>{fields.name}</div>
      <a
        target="_blank"
        href={`https://testnet.suivision.xyz/object/${objectId}`}
      >
        {objectId}
      </a>
      <div>{fields.stamina}</div>
    </div>
  );
};
