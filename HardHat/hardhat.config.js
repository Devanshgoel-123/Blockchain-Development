require("@nomicfoundation/hardhat-toolbox");
require("./tasks/blockNumber"); // You need to import the task from its file
/** @type import('hardhat/config').HardhatUserConfig */
const sepoliaURL="https://eth-sepolia.g.alchemy.com/v2/5OQ4Caki1L3ZKlcqHXgZCzO-iS0uZ_Ek";
const privateKey="b09671918bf15c9e6e0d80080b742bd114c2d01e09c5aaa92ccf714285faeb98";
// const sepoliaURL=process.env.SEPOLIA_RPC_URL
// const privateKey=process.env.PRIVATE_KEY
module.exports = {
  solidity: "0.8.7",
  networks:{
    sepolia:{
      url:sepoliaURL,
      accounts:[privateKey],
      chainId:11155111
    },
    localHost:{  // We run node and it creates a list of fake address to test locally as each time deployed hardhat netwrok gets reset
       url:"http://127.0.0.1:8545/",
       chainId:31337
    }
  },
  etherscan:{
    apiKey:"FZZ5XBZQQT6MTA6SX1Z5YR1BNZJR8UCFI4",

  }
};