import { Transaction } from "@mysten/sui/transactions";
import { MIST_PER_SUI, SUI_TYPE_ARG } from "@mysten/sui/utils";
import { ENV } from "../env";
import { suiClient } from "../suiClient";
import { getAddress } from "../helpers/getAddress";

test("Dry run transferring 0.01 SUI to the RECIPIENT_ADDRESS", async () => {
  const AMOUNT = 0.01 * Number(MIST_PER_SUI);
  const senderAddress = getAddress({ secretKey: ENV.USER_SECRET_KEY });

  // Create a transaction for transferring AMOUNT SUI to the RECIPIENT_ADDRESS
  const tx = new Transaction();
  tx.setSender(senderAddress);
  const [coin] = tx.splitCoins(tx.gas, [AMOUNT]);
  tx.transferObjects([coin], ENV.RECIPIENT_ADDRESS);

  // build and dry-run the transaction
  const txBytes = await tx.build({ client: suiClient });
  const { effects, balanceChanges } = await suiClient.dryRunTransactionBlock({
    transactionBlock: txBytes,
  });
  const recipientBalanceChange = balanceChanges.find(({ owner }) => {
    const addressOwner = (owner as { AddressOwner: string }).AddressOwner;
    return addressOwner === ENV.RECIPIENT_ADDRESS;
  });
  const senderBalanceChange = balanceChanges.find(({ owner }) => {
    const addressOwner = (owner as { AddressOwner: string }).AddressOwner;
    return addressOwner === senderAddress;
  });

  // log the gas cost and transaction digest
  // console.log("Gas cost:", effects.gasUsed);
  // console.log("Digest:", effects.transactionDigest);

  // expect the transaction to be successful and the balance changes to have changed accordingly
  expect(effects.status.status).toBe("success");
  expect(recipientBalanceChange?.coinType).toBe(SUI_TYPE_ARG);
  expect(parseInt(recipientBalanceChange!.amount)).toBe(AMOUNT);
  expect(senderBalanceChange?.coinType).toBe(SUI_TYPE_ARG);
  expect(parseInt(senderBalanceChange!.amount)).toBeLessThan(-AMOUNT);
});
