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
  
## 🚩 Challenge 1: 🥩 Decentralized Staking App
**1. Exercise Part 1: Implement the stake() method**
- In this part of the exercise, we want to allow users to stake some ETH in our contract and track their balances.  
- uint and uint256 are the same (it’s just an alias)  
- when a variable is declared public, Solidity will automagically create a getter method for you. This means that it will expose a yourVariableName() method to be called   
- when you declare a variable without initializing it, it will be initialized to its default value based on the variable type
Solidity exposes some utility units like wei, ethers, or time units.  

- Working dir: `cd hardhat`
- Run node: `yarn chain`  
- Run test: `yarn test`  
- Compile contracts: `yarn compile`  
- Run frontend: `yarn start`  
- Using hardhat-deploy to deploy the contracts, an Hardhat Plugin to better manage deployment

**2. Exercise Part 2: Implement the lock mechanism and withdraw**
- These conditions are:  
  - At least 1 ETH needs to be stacked on the Staker Contract  
  - The 1 ETH stack threshold is reached within a time deadline of 30 seconds  
- Concepts  
  - Modifier  
  - Error handling  
  - Transfer, send, call ether