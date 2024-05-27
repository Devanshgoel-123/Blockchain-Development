const hardhat=require("hardhat")
const {assert,expect}=require("chai");
const { ethers} = hardhat; 
 describe("SimpleStorage",function(){
    let simpleStorage;
    let SimpleStorageFactory;
    beforeEach(async function (){
       SimpleStorageFactory=await ethers.getContractFactory("SimpleStorage");
       simpleStorage=await SimpleStorageFactory.deploy();
    })

    it("Should start with a favourite number of 0",async function(){
        const currentValue=await simpleStorage.retrieve()
        const expectedValue="0";
        assert.equal(currentValue.toString(),expectedValue)
      //   expect(currentValue.toString()).to.equal(expectedValue);  These 2 lines do the same thing
    })

    it("SHould update when we call store",async function (){  // To run only a single test run command npx hardhat test --grep {keyword diifferent in that particular test}
      const expectedValue="7"
      const transactionResponse=await simpleStorage.store(expectedValue)
      await transactionResponse.wait(1)
      const currentValue=await simpleStorage.retrieve()
       assert.equal(currentValue.toString(),expectedValue)
    })
 })
