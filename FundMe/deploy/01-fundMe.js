// All scripts in the deploy folder are deplyed one by one

const { network } = require("hardhat");

const {networkConfig}=require("../helper-hardhat-config");
// function deployFunc(){
// }

// module.exports.default=deployFunc;

// Will be written as 
 module.exports=async ({getNamedAccounts,deployments})=>{
    const {deploy,logs}=deployments;
    const {deployer} = await getNamedAccounts(); //way for us to get named accounts 
    const chainId= await network.config.chainId;

    const ethUsdPriceFeedAddress=networkConfig[chainId]["ethUsdPriceFeed"];
    // Deploying a contract
    const fundMe=await deploy("FundMe",{
        from:deployer,
        args:[] // put price feed address
        
    })


 }