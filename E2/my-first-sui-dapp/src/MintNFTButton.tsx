import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";

export const MintNFTButton = () => {
  const queryClient = useQueryClient();
  const suiClient = useSuiClient();
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const handleMintNFT = async () => {
    if (!account?.address) {
      alert("Please connect your wallet");
      return;
    }
    const tx = new Transaction();
    const hero = tx.moveCall({
      target:
        "0x2eb076d9f07929c0db89564dbd2ea8fd08bb2cf8807dc4567c2f464e9cf8823e::hero::mint_hero",
      arguments: [],
    });
    tx.transferObjects([hero], account.address);
    signAndExecuteTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: async (result) => {
          console.log("Executed transaction", result);
          await suiClient.waitForTransaction({ digest: result.digest });
          await queryClient.invalidateQueries({ queryKey: ["testnet", "getOwnedObjects"] });
        },
      },
    );
  };

  return <Button onClick={handleMintNFT}>Mint NFT</Button>;
};
