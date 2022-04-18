const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking", function () {
  it("Should deployable the Staking contract", async function () {
    const factory = await ethers.getContractFactory("Staking");
    const ins = await factory.deploy();
    await ins.deployed()

    describe("Should be able staking", function() {
      it("call stake()", async function() {
        const [user] = await ethers.getSigners();
  
        await ins.stake({from: user.address, value: 1});
        amount = await ins.balances(user.address);
  
        expect(amount).to.equal(1);
      })
    })


  });
});
