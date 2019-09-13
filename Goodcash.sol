
// Smart contract released as open-source by GoodCash Foundation (https://goodcash.network)
pragma solidity ^0.5.1;

import "github.com/OpenZeppelin/zeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title ERC20Burn
 * @dev ERC20Burn is a base contract for burning ERC-20 tokens.
 */
contract ERC20Burn {
    address public owner;
    address public tokenContract;
    bool public pause;
    uint public balance;
 
    mapping(bytes => address) tokens;
    mapping(bytes => uint256) tokensPrice;
    mapping(bytes => address) tokensBurn;
    mapping(bytes => uint) tokensDecimals;
    mapping(address => uint) public earnedUser;
    mapping(address => bool) public participants;
    address[] public allUsers;
 
    IERC20 public IERC20Interface;

    /**
     * @dev Sets `msg.sender` as `owner` of the smart contract.
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev Change state of `pause` parameter.
     * @param state_ set to true to pause, set to false for Proof of Burn to work.
     */
    function addPause(bool state_) public onlyOwner returns(bool){
        pause = state_;
    }
 
    /**
     * @dev Sets the smart contract address of the ERC-20 token.
     * @param symbol_ symbol of the ERC-20 token.
     * @param address_ address of the ERC-20 token.
     */
    function addNewToken(bytes memory symbol_, address address_) public onlyOwner returns(bool){
        tokens[symbol_] = address_;
        return true;
    }

    /**
     * @dev Sets the price of a token where the price set should be 
     * the last price of the token when it has been on an exchange.
     * 1*10**18 is $1.00
     * 1*10**17 is $0.10
     * @param symbol_ symbol of an ERC20 Token.
     * @param price_ price ratio of AToken / Altcoin. 
     */
    function addPrice(bytes memory symbol_, uint256 price_, uint256 decimals_) public onlyOwner returns(bool){
        tokensPrice[symbol_] = price_*10**decimals_;
        return true;
    }

    /**
     * @dev Sets the "burn address" of a token. Certain ERC-20s 
     * are protected from being sent to 0x0 therefore will be sent to
     * next available address
     * @param symbol_ symbol of an ERC-20 token.
     * @param address_ burn address.
     */
    function addBurn(bytes memory symbol_, address address_) public onlyOwner returns(bool){
        tokensBurn[symbol_] = address_;
        return true;
    }
    
    /**
     * @dev Sets the decimal points of a token for calculating the price. The decimal
     * is the same as the one specified in the ERC-20's smart contract.
     * @param symbol_ symbol of an ERC-20 token.
     * @param decimal_ decimal number of an ERC-20 token 
     */
    function addDecimal(bytes memory symbol_,uint decimal_)public onlyOwner returns(bool){
        tokensDecimals[symbol_]=decimal_;
        return true;
    }

    /**
     * @dev returns the price of a token where 
     * 1*10**18 is $1.00
     * 1*10**17 is $0.10
     * @param symbol_ symbol of an ERC-20 token.
     * @return price of ERC-20 token.
     */        
    function returnPrice(bytes memory symbol_) public view returns(uint256){
        return(tokensPrice[symbol_]);
    }

    /**
     * @param symbol_ symbol of an ERC-20 token.
     * @return address of ERC-20 token.
     */
    function returnSymbol(bytes memory symbol_)public view returns(address){
        return(tokens[symbol_]);
    }

    /**
     * @param symbol_ symbol of an ERC-20 token.
     * @return burn address.
     */
    function returnBurnAddress(bytes memory symbol_) public view returns(address){
        return(tokensBurn[symbol_]);
    }
    
    /**
     * @return the number of unique participants
     */
    function returnNumberParticipants() public view returns(uint){
        return(allUsers.length);
    }

    /**
     * @dev Main function to burn tokens. 
     * Works if the user has approved this contract to transfer their tokens
     * @param symbol_ symbol of an ERC-20 Token.
     * @param amount_ number of tokens to burnt.
     */
    function transferTokens(bytes memory symbol_, uint256 amount_) public {
        require(pause == false);
        require(tokens[symbol_]!= 0x0000000000000000000000000000000000000000);
        require(amount_ > 0);

        address contract_ = tokens[symbol_];
        address burnAddress = tokensBurn[symbol_];
        address from_ = msg.sender;
        uint price = tokensPrice[symbol_];
        uint numberDecimals = tokensDecimals[symbol_];

        IERC20Interface = IERC20(contract_);

        if(amount_ > IERC20Interface.allowance(from_, address(this))){
            revert();
        }
        // send tokens to burn address 
        IERC20Interface.transferFrom(from_, burnAddress, amount_);
        if(participants[msg.sender]==false){
            participants[msg.sender]=true;
            allUsers.push(msg.sender);
        }
        
        uint total = SafeMath.div(SafeMath.mul(amount_,price),10**numberDecimals);
        balance+= total;
        earnedUser[msg.sender] += total;
        
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
}
