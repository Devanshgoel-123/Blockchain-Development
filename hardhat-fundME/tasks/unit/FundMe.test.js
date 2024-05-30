const {deployments,ethers, getNamedAccounts}=require("hardhat")
const {assert,expect}=require("chai")

describe("FundMe", async function(){
    let fundMe;
    let deployer;
    let mockV3Aggregator;
    const sendValue="1000000000000" // 
    beforeEach(async function(){ 
        //deploying our fund ME contract
        const accounts=await ethers.getSigners(); // to get accounts directly from hardaht config is this method. Returns whatever there is in account section of that particular netwrok
        deployer= (await getNamedAccounts()).deployer; // Helps us to identiufy the deployer
        await deployments.fixture(["all"])  // This ( .fixture ) enable us to run all our deployment projects having as amny tags as we want
        fundMe=await ethers.getContract("FundMe",deployer); // GEts the most recent deployment of our fund me contract using deployer gives the recent deploymnet by that particular deployer
        mockV3Aggregator=await ethers.getContract("MockV3Aggregator",deployer);
    })

    describe("constructor",async function(){
        it("sets the aggregator addresses corectly",async function(){
             const  response = await fundMe.priceFeed();
             assert.equal(response,mockV3Aggregator.address);

        })
    })
    describe("fund",async function(){ //npx harhat test --grep "amount funded"
        it("Fails if u dont send enough eth",async function(){
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH"); // Used expect from chai to expect the failure of things
        })
        it("Updates the amount funded ",async function(){
            await fundMe.fund({value:sendValue})
            const response=await fundMe.addressToAmountFunded(deployer) // Gets the amount funded by that particular user
            assert.equal(response.toString(),sendValue.toString());
        })
        it("Adds funder to array fo funders",async function(){
            await fundMe.fund({value:sendValue})
            const funder=await fundMe.funders(0)
            assert.equal(funder,deployer)
        })
    })
    describe("Withdraw",async function(){
        // Before funding we nee to fund some money into the contract
        beforeEach(async function(){
            await fundMe.fund({value:sendValue})
        })
        it("Withdraw ETH from a single founder",async function(){
           
            const transactionResponse=await fundMe.withdraw();
            const transReceipt=await transactionResponse.wait(1);
            //But how to get the gas cost
            const {gasUsed,effectiveGasPrice}=transReceipt
            const gasCost=gasUsed.mul(effectiveGasPrice)
            /// 
            const endingFundMeBalance= await fundMe.provider.getBalance(fundMe.address)
            const endingDeployerBalance= await fundMe.provider.getBalance(deployer)
        
            assert.equal(endingFundMeBalance,0)
            assert.equal(startingFundMeBalance.add(startingDeployerBalance),endingDeployerBalance.add(gasCost).toString());
        })
    })
    it("allows us to withdraw with multiple accounts",async function(){
        const accounts = await ethers.getSigners();
        for(let i=1;i<6;i++){
            const fundMeConnectedContract=await fundMe.connect(accounts[i]);
            await fundMeConnectedContract.fund({value:sendValue})
            
        }
        const startingFundMeBalance=await fundMe.provider.getBalance(fundMe.address)  // Could have also used ethers.provider
        const startingDeployerBalance=await fundMe.provider.getBalance(deployer)
        const transactionResponse=await fundMe.withdraw();
        const transReceipt=await transactionResponse.wait(1);
            //But how to get the gas cost
        const {gasUsed,effectiveGasPrice}=transReceipt
        const gasCost=gasUsed.mul(effectiveGasPrice)
        const endingFundMeBalance= await fundMe.provider.getBalance(fundMe.address)
        const endingDeployerBalance= await fundMe.provider.getBalance(deployer)
    
        assert.equal(endingFundMeBalance,0)
        assert.equal(startingFundMeBalance.add(startingDeployerBalance),endingDeployerBalance.add(gasCost).toString());
         // Making sure the funders are reset properly
         await expect(fundMe.funders(0)).to.be.reverted // Throws error as sabko khali kar diya hai

         for(i=1;i<6;i++){
            assert.equal(await fundMe.addressToAmountFunded(accounts[i].address),0)
         }
         if("only allows the owner to withdraw",async function(){
            const accounts=await ethers.getSigners();
            const attacker=accounts[1];
            const attackerConnectedContract=await fundMe.connect(attacker); //First the 
            await expect(attackerConnectedContract.withdraw()).to.be.revertedWith("FundMe__NotOwner")
         })
    })

})