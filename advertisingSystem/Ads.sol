//// To create an advertising system with business logic. Allows companies to bypass a message and a website
/// Contract owner must check that the message and websites are appropriate and accept requests. 
/// Accept maximum 50 ads in the array
pragma solidity ^0.5.8;

contract Advertising {
    
    struct Info {
      string message;
      string website;
    }
    mapping(address => Info) public theAd;

    address[] public ads;
    
    
    function getAdsLenght() public view returns(uint256){
        return ads.length;
    }
    
    function buyAd(string memory _message, string memory _website) payable public returns(bool){
        require(msg.value == 0.1 ether);
        
        Info storage adInfo = theAd[msg.sender];
        adInfo.message = _message;
        adInfo.website = _website;
        
        ads.push(msg.sender);
        
        return true;
    }
    
    
    
}
