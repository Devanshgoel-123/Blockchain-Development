const networkConfig={
    4:{
        name:"rinkeby",
        ethUsdPriceFeed:""
    },
    137:{
        name:"polygon",
        ethUsdPriceFeed:""
    }
}
const developmentChains=["hardhat","localhost"];
const Decimals=8;
const initial_Answer=200000000000;
module.exports={
    networkConfig,
    developmentChains,
    Decimals,
    initial_Answer
}