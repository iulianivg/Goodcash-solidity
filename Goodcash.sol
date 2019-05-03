pragma solidity ^0.4.24;

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address who) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address to, uint256 value) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function transferFrom(address from, address to, uint256 value) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract Goodcash{


 address public owner;
 address public tokenContract;
 
 mapping(string => address) tokens;
 mapping(string => uint256) tokensPrice;
 mapping(string => address) tokensBurn;
 mapping(string => uint256) tokensDecimals;
 
 IERC20 public IERC20Interface;
 IERC20 public IERC20Interface2;

 constructor() public {
    owner = msg.sender;
 }
 
 function addNewToken(string symbol_, address address_) public onlyOwner returns(bool){
    tokens[symbol_] = address_;

    return true;
 }
 function addPrice(string symbol_, uint256 price_) public onlyOwner returns(bool){
     tokensPrice[symbol_] = price_;
 }
 function addBurn(string symbol_, address address_) public onlyOwner returns(bool){
     tokensBurn[symbol_] = address_;
 }
 /// used when our cryptocurrency has 18 decimal points and the deadcoin has less
 function addDecimal(string symbol_, uint decimals) public onlyOwner returns(bool){
     tokensDecimals[symbol_] = 10**uint(decimals);
 }
 function removePrice(string symbol_) public onlyOwner returns(bool){
     require(tokensPrice[symbol_] != 0x0);
     delete(tokensPrice[symbol_]);
     return true;
 }
 function removeToken(string symbol_) public onlyOwner returns(bool){
    require(tokens[symbol_] != 0x0);

    delete(tokens[symbol_]);

    return true;
 }
 /// we will create functions to remove burn address and remove decimal
 
 function returnPrice(string symbol_) public view returns(uint256){
     return(tokensPrice[symbol_]);
 }
 function returnSymbol(string symbol_)public view returns(address){
    return(tokens[symbol_]);
 }
 //// function such that we can assign the contract address of our coin to a variable.
 function forContract(address address_) public onlyOwner{
     tokenContract = address_;
 }
 
 // main function to transfer tokens. Works if the user has approved this contract to burn their tokens
 function transferTokens(string symbol_, uint256 amount_) public {
    require(tokens[symbol_]!= 0x0);
    require(amount_ > 0);

    address contract_ = tokens[symbol_];
    uint256 tPrice_ = tokensPrice[symbol_];
    uint256 decimalsR = tokensDecimals[symbol_];
    address burnAddress = tokensBurn[symbol_];
    address from_ = msg.sender;
    
    IERC20Interface = IERC20(contract_);
    IERC20Interface2 = IERC20(tokenContract);


    if(amount_ > IERC20Interface.allowance(from_, address(this))){
        revert();
    }
    uint256 totalTokens_ = (amount_ / tPrice_)*decimalsR;
    IERC20Interface.transferFrom(from_, burnAddress, amount_);
    IERC20Interface2.transfer(from_, totalTokens_);

 }
 modifier onlyOwner(){
    require(msg.sender == owner);
    _;
 }
}
