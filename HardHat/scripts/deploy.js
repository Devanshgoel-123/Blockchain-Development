const hardhat=require("hardhat")
const { ethers,run ,network} = hardhat; //Imported network to get details of the network we are deploying to and run to verify our smart contract

const dotenv=require("dotenv")
dotenv.config();
async function main(){
    try {
        const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage"); //"SimpleStorage is the name of the contract file.sols"
        console.log("SimpleStorageFactory created successfully"); //here neither have we given the api,abi thus by default we use hardhat netwrok
        console.log("Deploying the contract");
        const simpleStorage = await SimpleStorageFactory.deploy();
        const address = await simpleStorage.getAddress(); // This is the line to get the address of where the contract is deployed
        console.log("Contract deployed to address:", address);
        // console.log(network.config)
        /// This is the section where we run a function to verify our deployed smart contract
        if(network.config.chainId===11155111){
            await simpleStorage.deploymentTransaction.wait(5);
             await verify(address,[]);
        }

        // Interacting with the smart Contract
        const currentValue=await simpleStorage.retrieve();
        console.log(String(currentValue));
        const transactionResponse=await simpleStorage.store(9);
        await transactionResponse.wait(1);
        const updatedValue=await simpleStorage.retrieve();
        console.log(String(updatedValue))

    } catch (error) {
        console.error("Error deploying contract:", error);
        process.exit(1);
    }
}

async function verify(contractAddress,args){  // to automatically verify smart contract using hardhat, this can be done with etherscan also using their api
    console.log("Verifying");
    try{
        await run("verify:verify",{ // Run can be used to run any hardhat task
            address:contractAddress,
            constructorArguments:args, // a constructor is a special function that is executed only once during the deployment of a contract. It is typically used to initialize contract state variables or perform other setup tasks.
        })
    }catch(e){
     if(e.message.toLowerCase().includes("already Verified")){
         console.log("Already Verfied")
     }else{
        console.log(e)
     }
    }
    
}

main()
.then(() => {
    console.log("Deployment completed successfully");
    process.exit(0);
})
.catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
});
