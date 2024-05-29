const {deployments,ethers, getNamedAccounts}=require("hardhat")
const {assert}=require("chai")

describe("FundMe", async function(){
    let fundMe;
    let deployer;
    let mockV3Aggregator;
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
})