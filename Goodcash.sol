pragma solidity ^0.5.8;

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

library SafeMath {
    /**
     * @dev Multiplies two unsigned integers, reverts on overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Adds two unsigned integers, reverts on overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
     * reverts when dividing by zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}


contract Goodcash{


 address public owner;
 address public tokenContract;
 bool public pause;
 
 mapping(bytes => address) tokens;
 mapping(bytes => uint256) tokensPrice;
 mapping(bytes => address) tokensBurn;
 mapping(bytes => uint256) tokensDecimals;
 
 IERC20 public IERC20Interface;
 IERC20 public IERC20Interface2;

 constructor() public {
    owner = msg.sender;
 }
 
 function addPause(bool _state) public onlyOwner returns(bool){
 pause = _state;
 }
 
 function addNewToken(bytes memory symbol_, address address_) public onlyOwner returns(bool){
    tokens[symbol_] = address_;

    return true;
 }
 function addPrice(bytes memory symbol_, uint256 price_) public onlyOwner returns(bool){
     tokensPrice[symbol_] = price_;
 }
 function addBurn(bytes memory symbol_, address address_) public onlyOwner returns(bool){
     tokensBurn[symbol_] = address_;
 }
 /// used when our cryptocurrency has 18 decimal points and the deadcoin has less
 function addDecimal(bytes memory symbol_, uint decimals) public onlyOwner returns(bool){
     tokensDecimals[symbol_] = 10**uint(decimals);
 }
 function removePrice(bytes memory symbol_) public onlyOwner returns(bool){
     require(tokensPrice[symbol_] != 0x0);
     delete(tokensPrice[symbol_]);
     return true;
 }
 function removeToken(bytes memory symbol_) public onlyOwner returns(bool){
    require(tokens[symbol_] != 0x0000000000000000000000000000000000000000);

    delete(tokens[symbol_]);

    return true;
 }
 
 function removeBurn(bytes memory symbol_) public onlyOwner returns(bool){
   require(tokensBurn[symbol_] != 0x0000000000000000000000000000000000000000);
   delete(tokensBurn[symbol_]);
   return true;
 }

 function removeDecimal(bytes memory symbol_) public onlyOwner returns(bool){
 require(tokensDecimals[symbol_]!=0x0);
 delete(tokensDecimals[symbol_]);
 return true;
 }
 
 function removeEverything(bytes memory symbol_) public onlyOwner returns(bool){
 require(tokensDecimals[symbol_]!=0x0);
 require(tokensBurn[symbol_]!=0x0000000000000000000000000000000000000000);
 require(tokensPrice[symbol_]!=0x0);
 require(tokens[symbol_]!=0x0000000000000000000000000000000000000000);
 
 delete(tokensDecimals[symbol_]);
 delete(tokensBurn[symbol_]);
 delete(tokensPrice[symbol_]);
 delete(tokens[symbol_]);
 return true;
 
 }
 
 function returnPrice(bytes memory symbol_) public view returns(uint256){
     return(tokensPrice[symbol_]);
 }
 function returnSymbol(bytes memory symbol_)public view returns(address){
    return(tokens[symbol_]);
 }
 function returnBurnAddress(bytes memory symbol_) public view returns(address){
    return(tokensBurn[symbol_]);
 }
 function returnDecimals(bytes memory symbol_) public view returns(address){
    return(tokensDecimals[symbol_]);
 }
 
 //// function such that we can assign the contract address of our coin to a variable.
 function forContract(address address_) public onlyOwner{
     tokenContract = address_;
 }
 
 // main function to transfer tokens. Works if the user has approved this contract to burn their tokens
 function transferTokens(bytes memory symbol_, uint256 amount_) public {
    require(pause == false);
    require(tokens[symbol_]!= 0x0000000000000000000000000000000000000000);
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
    uint256 totalTokens_ = SafeMath.mul(SafeMath.div(amount_,tPrice_),decimalsR);
    IERC20Interface.transferFrom(from_, burnAddress, amount_);
    IERC20Interface2.transfer(from_, totalTokens_);

 }
 modifier onlyOwner(){
    require(msg.sender == owner);
    _;
 }
}
