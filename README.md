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

**Exercise Part 2: Create a Router Contract**  
The Router contract will be responsible to _allow users to exchange ETH for our Token_   
We need to:  
  - Set a price for our token (1 ETH = 100 Token) (in deployment time or testing)
  - Implement a payable buyToken() function
  - Transfer all the Tokens to the Router contract  (in deployment time or testing)

Concepts:  
  - Events  
  - Payable functions
  - Openzeppelin Ownable, ownership
  - Openzeppelin address utility
  - Transfer and send token

**Exercise Part 3: Allow the Router to buy back!**  
The flow that will happen:
  - The user requests to “approve” the Router contract to transfer tokens from the user’s balance to Router's wallet (this will happen on the Token’s contract). 
  - When you invoke the approve function you will specify the number of tokens that you want to decide to let the other contract be able to transfer at max.  
  - The user will invoke a sellTokens function on Router contract that will transfer user’s balance to Router’s balance  
  - The router's contract will transfer to the user’s wallet an equal amount of ETH

Concepts:
  - ERC20 function approve
  - ERC20 function tranferFrom