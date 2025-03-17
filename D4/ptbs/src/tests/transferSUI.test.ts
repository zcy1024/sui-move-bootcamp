import { MIST_PER_SUI } from "@mysten/sui/utils";
import { ENV } from "../env";
import { transferSUI } from "../helpers/transferSUI";

test("Transferring 0.01 SUI to the RECIPIENT_ADDRESS", async () => {
  const AMOUNT = 0.01 * Number(MIST_PER_SUI);

  const { status, senderSUIBalanceChange, recipientSUIBalanceChange } =
    await transferSUI({
      amount: AMOUNT,
      senderSecretKey: ENV.USER_SECRET_KEY,
      recipientAddress: ENV.RECIPIENT_ADDRESS,
    });

  // expect the transaction to be successful and the balance changes to have changed accordingly
  expect(status).toBe("success");
  expect(recipientSUIBalanceChange).toBe(AMOUNT);
  expect(senderSUIBalanceChange).toBeLessThan(-AMOUNT);
});
