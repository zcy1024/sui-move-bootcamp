## Sui & Move Bootcamp <> End to End Decentralized Application

This is an Application showcasing the end to end flow of a decentralized application. The application is built using the Sui and Move concepts that were taught until now. 

We are going to keep building on this application as we learn more concepts in the upcoming sessions.

### Tech Stack

- User Interface (React)
- Smart Contracts (Move)
- Move Events
- Sui Wallet
- Move Shared Objects

### Business Description

The application will allow creations of Heros and weapons. 

- As a user I can create a Hero and equip them with a Weapon
    - Each hero can have only one weapon
    - Each hero has the following properties
      - Name
      - Stamina
      - Weapon
    - Each weapon has the following properties
      - Name
      - Destruction Power
- As a User, I can see the latest minted Heroes
- Each created hero is added in a central, shared Hero Registry (Shared Object)


### Implementation Tasks

- Create the smart contracts in Move + tests
  - Contracts already contain scaffolded code with basic structs and tests
- Create Typescript code to interact with the smart contracts
  - Create a Hero
  - Create a Weapon
  - Equip a Weapon to a Hero
  - Get the latest minted Heroes
- Create the React app with the following views:
  - Main view with latest created Heroes
  - Create Hero view
  - Integration with Wallet via Dapp-kit


