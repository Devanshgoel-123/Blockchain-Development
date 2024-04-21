// SPDX-License-Identifier: UNLICENSED
 pragma solidity ^0.8.7; /// require latest version of solidity anything greater than 0.8.7 would work

 contract SimpleStorage{                   // This is the basic of declaring a contract just like classes in java and all
  // 4 primary data types boolean , int, uint, address and bytes
  //    bool hasFavouriteNumber=true;  // data_Type[size] ex int8 declares the size of that variable
   uint public favouriteNumber;   
   // public makes it value visible to everybody
   //Default visibility type of a variable is internal

    struct People{
        uint256 favouriteNumber;      // Structure of people item would appear
        string name;
    }   

    // People public person=People({favouriteNumber:2,name:"Devansh"});   // Using structure with name people but the issue here is that u have to repaet this fro each new person
    //THus we use array
  
    People[] public people;  //dataType visibility and name
    // uint256[] public favouriteNumberList;

    mapping(string => uint256) public nameToFavoriteNumber;  //Data Structure(like dictionary) which key(string in this case) has some value associated to it 
     
      // This virtual here is necessary when overriding a function in a child file like ExtraStorage.sol
    function store(uint256 _favoriteNumber) public virtual {
        favouriteNumber = _favoriteNumber;
    }

     function retrieve() public view returns(uint256){   //view,pure dont use any gas . View and pure dont allow to modify state of blockchain
         return favouriteNumber;
     }
 
     /// To store data there are 3 major places CallData, Memory, Storage

     // CallData and memory store variable temporarily till the transaction runs
       // Storage stores even outside function executing 
       // Calldata is not modifiable while memory is 
     function addPerson(string memory name, uint256 _favouriteNumber) public { //Memory 
        people.push(People(_favouriteNumber,name));
        nameToFavoriteNumber[name]=_favouriteNumber;

     }
}  

// For Deploying go to 4th button 
