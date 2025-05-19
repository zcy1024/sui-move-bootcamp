import {
  CoinBalance,
  getFullnodeUrl,
  SuiClient,
  SuiHTTPTransport,
} from "@mysten/sui/client";
import { SuiGraphQLClient } from "@mysten/sui/graphql";
import { graphql } from "@mysten/sui/graphql/schemas/latest";
import {
  getFaucetHost,
  requestSuiFromFaucetV1,
  requestSuiFromFaucetV2,
} from "@mysten/sui/faucet";
import { MIST_PER_SUI } from "@mysten/sui/utils";

xtest("Simple JSON RPC CLient - Devnet", async () => {
  const MY_ADDRESS =
    "0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa37";

  // create a new SuiClient object pointing to the network you want to use
  const suiClient = new SuiClient({ url: getFullnodeUrl("devnet") });

  // Convert MIST to Sui
  const balance = (balance: CoinBalance) => {
    return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
  };

  // store the JSON representation for the SUI the address owns before using faucet
  const suiBefore = await suiClient.getBalance({
    owner: MY_ADDRESS,
  });

  await requestSuiFromFaucetV2({
    // use getFaucetHost to make sure you're using correct faucet address
    // you can also just use the address (see Sui TypeScript SDK Quick Start for values)
    host: getFaucetHost("devnet"),
    recipient: MY_ADDRESS,
  });

  // store the JSON representation for the SUI the address owns after using faucet
  const suiAfter = await suiClient.getBalance({
    owner: MY_ADDRESS,
  });

  expect(balance(suiAfter)).toBe(balance(suiBefore) + 10);
});

xtest("Simple JSON RPC CLient - Localnet", async () => {
  const MY_ADDRESS =
    "0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa37";

  // create a new SuiClient object pointing to the network you want to use
  const suiClient = new SuiClient({ url: getFullnodeUrl("localnet") });

  // Convert MIST to Sui
  const balance = (balance: CoinBalance) => {
    return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
  };

  // store the JSON representation for the SUI the address owns before using faucet
  const suiBefore = await suiClient.getBalance({
    owner: MY_ADDRESS,
  });

  let faucetResponse = await requestSuiFromFaucetV1({
    // use getFaucetHost to make sure you're using correct faucet address
    // you can also just use the address (see Sui TypeScript SDK Quick Start for values)
    host: getFaucetHost("localnet"),
    recipient: MY_ADDRESS,
  });

  console.log(faucetResponse);

  // store the JSON representation for the SUI the address owns after using faucet
  const suiAfter = await suiClient.getBalance({
    owner: MY_ADDRESS,
  });

  expect(balance(suiAfter)).toBe(balance(suiBefore) + 1000);
});

xtest("Custom JSON RPC CLient - Localnet", async () => {
  const MY_ADDRESS =
    "0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa38";

  // create a new SuiClient object pointing to the network you want to use
  const suiClient = new SuiClient({
    transport: new SuiHTTPTransport({
      url: "http://127.0.0.1:9000",
      rpc: {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer my-secret-key",
        },
      },
    }),
  });

  // Convert MIST to Sui
  const balance = (balance: CoinBalance) => {
    return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
  };

  // store the JSON representation for the SUI the address owns before using faucet
  const suiBefore = await suiClient.getBalance({
    owner: MY_ADDRESS,
  });

  let faucetResponse = await requestSuiFromFaucetV1({
    // use getFaucetHost to make sure you're using correct faucet address
    // you can also just use the address (see Sui TypeScript SDK Quick Start for values)
    host: getFaucetHost("localnet"),
    recipient: MY_ADDRESS,
  });

  console.log(faucetResponse);

  // store the JSON representation for the SUI the address owns after using faucet
  const suiAfter = await suiClient.getBalance({
    owner: MY_ADDRESS,
  });

  expect(balance(suiAfter)).toBe(balance(suiBefore) + 1000);
});

xtest("Simple GraphQL CLient - Testnet", async () => {
  const MY_ADDRESS =
    "0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6aa39";

  // create a new SuiClient object pointing to the network you want to use
  const suiClient = new SuiGraphQLClient({
    url: "https://sui-devnet.mystenlabs.com/graphql",
  });

  const balanceQuery = graphql(`
    query {
      address(address: "${MY_ADDRESS}") {
        balance {
          totalBalance
        }
      }
    }
  `);

  // Convert MIST to Sui
  const balance = (balance: CoinBalance) => {
    return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
  };

  // store the JSON representation for the SUI the address owns before using faucet
  // @ts-ignore
  const suiBefore = (
    await suiClient.query({
      query: balanceQuery,
    })
  ).data?.address.balance.totalBalance;

  let faucetResponse = await requestSuiFromFaucetV2({
    // use getFaucetHost to make sure you're using correct faucet address
    // you can also just use the address (see Sui TypeScript SDK Quick Start for values)
    host: getFaucetHost("devnet"),
    recipient: MY_ADDRESS,
  });

  console.log(faucetResponse);

  // store the JSON representation for the SUI the address owns after using faucet
  // @ts-ignore
  const suiAfter = (
    await suiClient.query({
      query: balanceQuery,
    })
  ).data?.address.balance.totalBalance;

  // @ts-ignore
  expect(balance(suiAfter)).toBe(balance(suiBefore) + 1000);
});

test("Simple JSON RPC CLient Limits - Testnet", async () => {
  const MY_ADDRESS =
    "0xf38a463604d2db4582033a09db6f8d4b846b113b3cd0a7c4f0d4690b3fe6a";

  // create a new SuiClient object pointing to the network you want to use
  // const suiClient = new SuiClient({ url: getFullnodeUrl("mainnet") });
  const suiClient = new SuiClient({
    transport: new SuiHTTPTransport({
      url: "https://fullnode.testnet.sui.io:443",
    }),
  });

  let error = undefined;

  try {
    // Create an array of promises for parallel execution
    const promises = Array.from({ length: 800 }, (_, i) => {
      const address = MY_ADDRESS.concat((i + 100).toString());
      return suiClient.getOwnedObjects({
        owner: address,
      });
    });

    // Execute all promises in parallel
    const results = await Promise.all(promises);

    // Process results if needed
    results.forEach((objects, index) => {
      console.log(`Address ${index + 100}:`, objects);
    });
  } catch (e) {
    error = e;
  }

  console.log(error);

  expect(error).toBeDefined();
});
