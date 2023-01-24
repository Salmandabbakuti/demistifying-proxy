//SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "./StorageSlot.sol";

contract Proxy {
    function changeImplementation(address _implementation) public {
        // Set the implementation address in the specific storage slot to prevent collisions
        StorageSlot
            .getAddressSlot(keccak256("PROXY_IMPLEMENTATION"))
            .value = _implementation;
    }

    fallback() external {
        (bool success, ) = StorageSlot
            .getAddressSlot(keccak256("PROXY_IMPLEMENTATION"))
            .value
            .delegatecall(msg.data);
        require(success, "Proxy: delegatecall failed");
    }
}

contract Logic1 {
    uint public x = 0;

    function changeX(uint _x) external {
        x = _x;
    }
}

contract Logic2 {
    uint public x = 0;

    function changeX(uint _x) external {
        x = _x;
    }

    function tripleX() external {
        x *= 3;
    }
}
