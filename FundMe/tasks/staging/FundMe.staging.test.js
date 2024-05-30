//last step in our development journey
const {getNamedAccounts,ethers,network}=require("hardhat")
const {developmentChains}=require("../../helper-hardhat-config")

developmentChains.includes(network.name) ? describe.skip :
describe("FundMe",async function(){
   let FundMe
   let deployer
   const sendValue=ethers.utils.parseEther("1");
   beforeEach(async function(){
    deployer=(await getNamedAccounts()).deployer
    fundMe=await ethers.provider.getContract("FundMe",deployer)
   })

})