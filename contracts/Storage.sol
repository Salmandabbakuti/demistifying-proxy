//SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract Storage {
    string private greeting; // 0x0
    uint256 public x = 12; // 0x1
    uint256 public y = 97; // 0x2

    mapping(uint256 => uint256) public myMap; // 0x3 => Base Slot

    constructor(string memory _greeting) {
        greeting = _greeting;
        // Storage: Keccak256(12 + 0x3);
        myMap[12] = 34;
        // Storage: Keccak256(23 + 0x3);
        myMap[23] = 47;
    }
}
