# ERC20-buy-sell-exchange
The goal of this challenge is to create your own ERC20 Token and a Token Vendor Contract that will handle the sell/buy process of your token exchanging it with ETH sent by the user.

- Following the tutorial, thank Emanuele Ricci: https://dev.to/stermi/how-to-create-an-erc20-token-and-a-solidity-vendor-contract-to-sell-buy-your-own-token-4j1m

- Fork the scaffold ETH project at https://github.com/scaffold-eth/scaffold-eth  

- Each challenge push to a specify branch.  

## Setup
- Init hardhat project: `mkdir hardhat && cd hardhat && npx hardhat`

```
npm install hardhat hardhat-deploy @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers # For hardhat framework
npm install @openzeppelin/contracts # security 
```

  
## 🚩 Challenge 1: 🥩 Decentralized Staking App
**1. Exercise Part 1: Implement the stake() method**
- In this part of the exercise, we want to allow users to stake some ETH in our contract and track their balances.  
- uint and uint256 are the same (it’s just an alias)  
- when a variable is declared public, Solidity will automagically create a getter method for you. This means that it will expose a yourVariableName() method to be called   
- when you declare a variable without initializing it, it will be initialized to its default value based on the variable type
Solidity exposes some utility units like wei, ethers, or time units.  

- Run node: `npx hardhat node`  
- Run test: `npx hardhat test`  
- Run frontend: `yarn start`  
- Using hardhat-deploy to deploy the contracts, an Hardhat Plugin to better manage deployment