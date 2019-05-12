pragma solidity ^0.4.24;

contract stringToBytes {
    function convertToBytes (string _string) public pure returns (bytes) {
        bytes memory _bytes = bytes(_string);
        return _bytes;
    }
}
