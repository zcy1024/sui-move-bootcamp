## Sui & Move Bootcamp <> End to End Decentralized Application | React App

This exercise is a simple React app that uses the smart contracts and the Typescript integration tests we have built in the previous steps.

The app will have three main views:

- Main view with latest created Heroes
- Create Hero view
- My Heroes view

### Instructions

In an approach similar to the section E2, we will be using the [@mysten/create-dapp](https://sdk.mystenlabs.com/dapp-kit/create-dapp) CLI tool to bootstrap a new React app with Vite, and integrate the [Sui dApp Kit](https://sdk.mystenlabs.com/dapp-kit) package.

1. `cd app`
2. `npm create @mysten/dapp`
3. `cd <app-name>`
4. `pnpm i`
5. `pnpm run dev`

#### 1st View: Latest Created Heroes

In this view, we will utilise the shared object `HeroRegistry`, which keeps track of all the created Heroes.
1. Let's move on by creating a new React component, called `HeroesList`, that:
    * reads the contents of the `HeroRegistry` object
    * renders a link to a sui explorer for each Hero
2. Let's display the fields of each Hero NFT:
    * add a call to the `multiGetObjects` RPC method, so that we can fetch the data of each Hero
    * create a simple `HeroCard` component to display these data

#### 2nd View: Create Hero

#### 3rd View: My Heroes
