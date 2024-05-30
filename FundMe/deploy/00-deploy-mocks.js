const { network } = require("hardhat");
const {developmentChains,Decimals, initial_Answer}=require("../helper-hardhat-config")
module.exports=async ({getNamedAccounts,deployments})=>{
    const {deploy,logs}=deployments;
    const {deployer} = await getNamedAccounts(); //way for us to get named accounts 
    const chainId= await network.config.chainId;
    // if(chainId!="Some chain ID then deploy mock" )//
    if(developmentChains.includes(network.name)){
        console.log("Local netwrok detected! Deploying mocks...")
        await deploy("MockV3Aggregator",{
            contract:"MockV3Aggregator",
            from:deployer,
            log:true, //log true logs the information like address  
            args:[Decimals,initial_Answer]
        })
        console.log("Mocks Deployed")
    }
}


module.exports.tags=["all","mocks"]; // npx hardhat deploy --tags mocks this will only run our only deploy scr