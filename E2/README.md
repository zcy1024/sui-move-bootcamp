## Sui & Move Bootcamp <> Sui dApp Kit

This exercise is a simple e2e example of building a dApp that allows the user to:

- connect their Sui wallet
- see a list with their owned objects
- mint an NFT

For this integration, we will be using [Sui dApp Kit](https://sdk.mystenlabs.com/dapp-kit)
<i>The Sui dApp Kit is a set of React components, hooks, and utilities to help you build a dApp for the Sui ecosystem.</i>

### Instructions

To bootstrap our application, we will be using the CLI tool [@mysten/create-dapp](https://sdk.mystenlabs.com/dapp-kit/create-dapp).

1. Setup and start exploring your app:

> 1. `cd E2`
> 2. `npm create @mysten/dapp` (choose the `react-client-dapp` template)
> 3. cd `<app-name>`
> 4. `pnpm i`
> 5. `pnpm run dev`
>
> Notice how @mysten/dapp-kit exports the following elements:
>
> - `<ConnectWallet />` component for handling connecting wallets in `App.tsx`
> - `useCurrentAccount()` hook for getting the current account in `WalletStatus.tsx`
> - `useSuiClientQuery()` hook for executing read queries in `OwnedObjects.tsx`

2. Allow the users to sign and execute a transaction for minting an NFT:

> 1. Add a `<MintNFTButton />` component with a simple button
> 2. Use the `useSignAndExecuteTransaction()` function to mint the NFT
> 3. Add auto-refreshing the owned objects list to see the minted NFT
