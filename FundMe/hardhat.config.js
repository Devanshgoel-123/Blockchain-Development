require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{
    compilers:[{version:"0.8.8"},{version:"0.6.6"}],
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
    },
},
networks: {
  hardhat: {
      chainId: 1337,
  },
  localhost: {
      chainId: 1337,
  },
},
};
