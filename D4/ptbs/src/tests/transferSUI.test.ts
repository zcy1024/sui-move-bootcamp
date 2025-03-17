import { MIST_PER_SUI } from "@mysten/sui/utils";
import { ENV } from "../env";
import { transferSUI } from "../helpers/transferSUI";
import { parseBalanceChanges } from "../helpers/parseBalanceChanges";
import { getAddress } from "../helpers/getAddress";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";

const AMOUNT = 0.01 * Number(MIST_PER_SUI);

describe("Transfer SUI amount", () => {
  let txResponse: SuiTransactionBlockResponse; // Use a scoped variable instead of `this`
  let recipientSUIBalanceChange: number;
  let senderSUIBalanceChange: number;

  beforeAll(async () => {
    txResponse = await transferSUI({
      amount: AMOUNT,
      senderSecretKey: ENV.USER_SECRET_KEY,
      recipientAddress: ENV.RECIPIENT_ADDRESS,
    });
    console.log("Executed transaction with txDigest:", txResponse.digest);
    
    if (!txResponse.balanceChanges) {
      throw new Error(
        "Balance changes not found in the response. Make sure you added the showBalanceChanges option!"
      );
    }
    const balanceChanges = parseBalanceChanges({
      balanceChanges: txResponse.balanceChanges,
      senderAddress: getAddress({ secretKey: ENV.USER_SECRET_KEY }),
      recipientAddress: ENV.RECIPIENT_ADDRESS,
    });
    recipientSUIBalanceChange = balanceChanges.recipientSUIBalanceChange;
    senderSUIBalanceChange = balanceChanges.senderSUIBalanceChange;
  });

  test("Transfer SUI amount", async () => {
    expect(txResponse.effects?.status.status).toBe("success");
  });

  test("Parse SUI Balance Changes", async () => {
    expect(recipientSUIBalanceChange).toBe(AMOUNT);
    expect(senderSUIBalanceChange).toBeLessThan(-AMOUNT);
  });
});
