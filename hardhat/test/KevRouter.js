const {ethers} = require('hardhat');
const {expect} = require('chai');

describe("* Kev Router", () => {

    let routerIns, traderKevIns;
    let owner, user;

    beforeEach(async () => {
        console.log("\t> Deploy TraderKev contract")
        const Kevfactory = await ethers.getContractFactory("TraderKev");
        traderKevIns = await Kevfactory.deploy(
            "TraderKev",
            "KEV",
            ethers.utils.parseEther(String(1e6)) // total supply
        );
        await traderKevIns.deployed();
        
        console.log("\t> Deploy KevRouter contract")
        const factory = await ethers.getContractFactory("KevRouter");
        routerIns = await factory.deploy(
            traderKevIns.address,
            100 // 100 KEV = 1 ETH
        );
        await routerIns.deployed();

        [owner, user] = await ethers.getSigners();

        // add liquidity for KevRouter
        await traderKevIns.transfer(
            routerIns.address, 
            ethers.utils.parseEther(String(1e6))
        );
       
    });

    describe("Exchange Token", () => {

        it("Should be buy token successful", async () => {
            const currentRouterBalance = await traderKevIns.balanceOf(routerIns.address);
            console.log("\t> Current Router balance: ", ethers.utils.formatEther(currentRouterBalance));
            expect(currentRouterBalance).to.equal(
                ethers.utils.parseEther(String(1e6))
            );
         
            console.log("\t> A user buy KEV with 1 ETH ")
            await routerIns.connect(user).buyToken({
                value: ethers.utils.parseEther('1')
            });

            const amountOfUser = await traderKevIns.balanceOf(user.address);
            expect(amountOfUser).to.equal(
                ethers.utils.parseEther(String(1 * 100)) // Buy 1 ETH => 100 token
            )

            const amountOfRouter = await traderKevIns.balanceOf(routerIns.address)
            expect(amountOfRouter).to.equal(
                ethers.utils.parseEther(String(1e6 - 1*100))
            );


            describe("\t** Sell Token", () => {
                it("Should be sell tokens successful", async () => {
                    const wannaSell = ethers.utils.parseEther('90');
        
                    let amountOfUser = await traderKevIns.balanceOf(user.address);
                    console.log("\t> Current amount of user: ", ethers.utils.formatEther(amountOfUser))

                    // Approve 
                    await traderKevIns.connect(user).approve(routerIns.address, wannaSell);
                    
                    const allowance = await traderKevIns.allowance(user.address, routerIns.address);
                    console.log('\t> Approve and check allowance: ', ethers.utils.formatEther(allowance));
                    expect(allowance).to.equal(wannaSell);

                    await routerIns.connect(user).sellTokens(wannaSell)

                    amountOfUser = await traderKevIns.balanceOf(user.address);
                    console.log("\t> Final amount of user: ", ethers.utils.formatEther(amountOfUser))
        
                })
            })

        });

        
    });

    


})