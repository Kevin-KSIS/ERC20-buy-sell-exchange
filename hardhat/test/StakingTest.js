const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("* Staking", function () {
  it("Should deployable the Staking contract", async function () {
    const factory = await ethers.getContractFactory("Staking");
    const ins = await factory.deploy();
    await ins.deployed()
    const [user] = await ethers.getSigners();

    describe("** Stake", function() {
      it("Should be able staking", async function() {
  
        await ins.stake({
          from: user.address, 
          value: ethers.utils.parseEther("1")
        });
        amount = await ins.balances(user.address);
  
        expect(ethers.utils.formatEther(amount)).to.equal("1.0");
      })
    }),

    describe("\t** Withdraw", function() {

      it("Disallowable withdraw because deadline not reached yet", async function() {
        const timeleft = await ins.timeleft();
        console.log("\t", "> Current time remain: ", timeleft.toNumber(), " seconds");
        expect(timeleft.toNumber()).be.not.equal(0);

        await expect(
          ins.withdraw()
        ).to.be.revertedWith('Deadline is not reached yet');
      }),

      it("Should be able to withdraw", async function() {

        // check balance
        const current_balance = await ins.balances(user.address);
        console.log("\t", "+ The current balance: ", ethers.utils.formatEther(current_balance));

        // Time traveling
        console.log("\t>Time traveling")
        await network.provider.send("evm_increaseTime", [3600]);
        await network.provider.send("evm_mine");

        timeleft = await ins.timeleft();
        console.log('\t',"> Time should be up now: ", timeleft.toNumber())
        expect(timeleft).be.equal(0)

        // Withdraw
        console.log('\t',"> Calling withdraw");
        await ins.withdraw();
        const balance_remain = await ins.balances(user.address);
        expect(ethers.utils.formatEther(balance_remain)).be.equal("0.0");
  
      }),

      it("Disallowable withdraw because user balance not enough", async function() {
          // Checking current user balance less than 1
          const current_balance = await ins.balances(user.address);
          console.log("\t> Current user balance: ", ethers.utils.formatEther(current_balance));
          expect(Number(ethers.utils.formatEther(current_balance))).be.lessThan(1);

          // withdraw
          await expect(
            ins.withdraw()
          ).to.be.revertedWith("Your balance not enough to withdraw");
      })

    })


  });
});
