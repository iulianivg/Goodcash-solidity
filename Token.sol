pragma solidity ^0.5.2;  

import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

  /**  
  * @title Goodcash is ERC20
  * @title Total Supply is 125 million
  * @title decimals is 18
  * @title name is Goodcash
  * @title symbol is GCASH
  */  
contract Goodcash is ERC20, ERC20Detailed, Ownable{  

  uint256 public initialSupply  = 125000000000000000000000000; 
  /**  
  * @dev assign totalSupply to account deploying smart contract 
  */  

  constructor() public payable ERC20Detailed("Goodcash", "GCASH", 18) {  

   _mint(msg.sender, initialSupply);

 }
    
}
