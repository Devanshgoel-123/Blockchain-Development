const { tasks }=require("hardhat/config");

//Creating custom tasks in hardhat

task("block-number","Prints the current block Number").setAction(
    async (taskArgs,hre)=>{ //hre is the hardhat runtime environment can use all packages that hardhat uses
        const blockNumber=await hre.ethers.provider.getBlockNumber();
        console.log(blockNumber) // But to get it to show in the tasks list export it

    }
)
module.exports={

}