import { BalanceChange } from "@mysten/sui/client";

interface Args {
  balanceChanges: BalanceChange[];
  senderAddress: string;
  recipientAddress: string;
}

interface Response {
  recipientSUIBalanceChange: number;
  senderSUIBalanceChange: number;
}

/**
 * Parses the balance changes as they are returned by the SDK.
 * Filters out and formats the ones that correspond to SUI tokens and to the defined sender and recipient addresses.
 */
export const parseBalanceChanges = ({
  balanceChanges,
  senderAddress,
  recipientAddress,
}: Args): Response => {
  // TODO: Implement the function
  return {
    recipientSUIBalanceChange: 0,
    senderSUIBalanceChange: 0,
  }
};
