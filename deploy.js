//asynchronous means exectuing at the smae time without waiting;
//await waits fro the promise to be fulfilled and then moves onto the next line;
//for example we have to wait to deploy the contract

import {ethers} from "ethers";
import fs from "fs-extra"
import 'dotenv/config'
async function main(){
    const provider=new ethers.providers.JsonRpcProvider(process.env.RPC_URL); //http://127.0.0.1:7545 we can make api call to this node but it is annyoing thus we use ether.js or web3.js to interact with our blockchain node
    const wallet=new ethers.Wallet(process.env.PRIVATE_KEY,provider);
    const abi=fs.readFileSync("./simpleStorage_sol_SimpleStorage.abi","utf-8");
    const binary=fs.readFileSync("./simpleStorage_sol_SimpleStorage.bin","utf-8");
     const contractFactory=new ethers.ContractFactory(abi,binary,wallet);  // This is just an object used to deploy a contract using ether.js
    console.log("Deploying wait");
    const contract=await contractFactory.deploy(); //<-We can pass various parameters like gasLimit,gasPrice etc.
    // console.log(contract)
   await contract.deployTransaction.wait(1) // No. of confirmations we want to wait from blocks that contract has been depoyed
       
    //Interacting with the contract
    const favouriteNUmber=await contract.retrieve(); //<- as this is the retrieve function no gas used as just reading\
    console.log(favouriteNUmber.toString())
    const transResponse=await contract.store("9");
    const transReceipt=await transResponse.wait(1);
    const updateFavouriteNumber=await contract.retrieve();
    console.log(updateFavouriteNumber.toString())
    
}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.log(error);
    process.exit(0)
});  