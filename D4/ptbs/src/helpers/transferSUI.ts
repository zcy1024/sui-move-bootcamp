import { Transaction } from "@mysten/sui/transactions";
import { getAddress } from "./getAddress";
import { ENV } from "../env";
import { suiClient } from "../suiClient";
import { getSigner } from "./getSigner";
import { SUI_TYPE_ARG } from "@mysten/sui/dist/cjs/utils";

interface TransferSuiArgs {
  amount: number;
  senderSecretKey: string;
  recipientAddress: string;
}

interface TransferSuiResponse {
  recipientSUIBalanceChange: number;
  senderSUIBalanceChange: number;
  txDigest: string;
  status?: "success" | "failure";
}

/**
 * Transfers the specified amount of SUI from the sender secret key to the recipient address.
 * Returns the balance changes of the sender and recipient, the txDigest, and the status of the execution.
 */
export const transferSUI = async ({
  amount,
  senderSecretKey,
  recipientAddress,
}: TransferSuiArgs): Promise<TransferSuiResponse> => {
    const senderAddress = getAddress({ secretKey: senderSecretKey });
    const tx = new Transaction();
    tx.setSender(senderAddress);
    const [coin] = tx.splitCoins(tx.gas, [amount]);
    tx.transferObjects([coin], recipientAddress);

    const resp = await suiClient.signAndExecuteTransaction({
      transaction: tx,
      signer: getSigner({ secretKey: senderSecretKey }),
      options: {
        showEffects: true,
        showBalanceChanges: true,
      },
    });

    const balanceChanges = resp.balanceChanges!;

    const recipientSUIBalanceChange = balanceChanges.find(
      ({ owner, coinType }) => {
        const addressOwner = (owner as { AddressOwner: string }).AddressOwner;
        return (
          addressOwner === ENV.RECIPIENT_ADDRESS && coinType === SUI_TYPE_ARG
        );
      }
    );
    const senderSUIBalanceChange = balanceChanges.find(({ owner, coinType }) => {
      const addressOwner = (owner as { AddressOwner: string }).AddressOwner;
      return addressOwner === senderAddress && coinType === SUI_TYPE_ARG;
    });

    return {
      recipientSUIBalanceChange: parseInt(
        recipientSUIBalanceChange?.amount ?? "0"
      ),
      senderSUIBalanceChange: parseInt(senderSUIBalanceChange?.amount ?? "0"),
      txDigest: resp.digest,
      status: resp.effects?.status.status,
    };

  return {
    recipientSUIBalanceChange: 0,
    senderSUIBalanceChange: 0,
    txDigest: "",
    status: "failure",
  };
};
