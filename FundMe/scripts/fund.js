const {getNamedAccounts,ethers }=require("hardhat")

async function main(){
    const {deployer}=await getNamedAccounts()
    const fundMe=await ethers.getContract("FundMe",deployer);
    console.log("Funding THe contract")
    const transActionResponse=await fundMe.fund({value:ethers.utils.parseEther("1")});
    await transActionResponse.wait(1);
    console.log("Fundede")
}