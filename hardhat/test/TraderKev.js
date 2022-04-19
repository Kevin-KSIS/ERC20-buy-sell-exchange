const {ethers} = require('hardhat');
const { expect } = require('chai');

describe('TraderKev', function() {
    let instance, owner, user; 

    beforeEach( async () => {
        [owner, user] = await ethers.getSigners();
        console.log("\t> Owner's address: ", owner.address);
        console.log("\t> User's address: ", user.address);

        const contractFactory = await ethers.getContractFactory('TraderKev');
        instance = await contractFactory.deploy(
            "TraderKev",
            "KEV",
            1e6
        );
        await instance.deployed();
    });

    describe("ERC20 inhering", async function() {

        xit('Should be exactly Name, Symbol and Total Supply of contract', async function() {

            const nameExpected = "TraderKev";
            const symbolExpected = "KEV";
            const totalSupplyExpected = 1e6;

            console.log("\t> Get name")
            const nameReceived = await instance.name();
            expect(nameReceived).to.equal(nameExpected);

            console.log("\t> Get symbol")
            const symbolReceived = await instance.symbol();
            expect(symbolReceived).to.equal(symbolExpected)

            console.log("\t> Get total supply")
            const totalReceived = await instance.totalSupply();
            expect(totalReceived).to.equal(totalSupplyExpected);

        });

        it('Should transferable from owner to user', async function() {

            await instance.transfer(
                user.address, 
                ethers.utils.parseEther('1000')
            );
            const ownerBalance = await instance.balanceOf(owner.address);
            const userBalance = await instance.balanceOf(user.address);

            // convert ether base18 to base 10
            console.log("\t> Owner balance after transfer: ", ethers.utils.formatEther(ownerBalance));
            console.log("\t> User balance after transfer: ", ethers.utils.formatEther(userBalance));
          
            expect(ownerBalance).to.equal(
                ethers.utils.parseEther(String(1e6 - 1000))
            );

            expect(userBalance).to.equal(
                ethers.utils.parseEther('1000')
            );

        })

    })
    
})