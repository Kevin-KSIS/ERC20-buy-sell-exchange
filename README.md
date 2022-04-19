# ERC20-buy-sell-exchange
The goal of this challenge is to create your own ERC20 Token and a Token Vendor Contract that will handle the sell/buy process of your token exchanging it with ETH sent by the user.

- Following the tutorial, thank Emanuele Ricci: https://dev.to/stermi/scaffold-eth-challenge-1-staking-dapp-4ofb

- Fork the scaffold ETH project at https://github.com/scaffold-eth/scaffold-eth  

- Each challenge push to a specify branch.  

## Setup
- Init hardhat project: 
```
mkdir hardhat && \
cd hardhat && \
yarn init --yes && \
yarn add -D hardhat
```

```
yarn add -D hardhat-deploy hardhat-deploy-ethers ethers chai chai-ethers mocha @types/chai @types/mocha @types/node typescript ts-node dotenv # For hardhat framework
yarn add -D @openzeppelin/contracts # security 

```
- If modify some things, re-run install `yarn install`
  
## 🚩 Challenge 2: 🥩 ERC20 and Token Router Contract to buy/sell your own token
**Exercise Part 1: Create your own ERC20 Token and deploy it!**  
- Concepts:
  - OpenZeppelin ERCO20
  - Ethereum ERC-20 Standard
  - Inheritance
  - Shadowing inherited State variables

- Inhering OpenZeppelin ERC20
- Minting owner token
- Writing unit tests: 
  - Checking name, symbol and total supply are exactly.
  - Checking transfer the token from the owner to a user