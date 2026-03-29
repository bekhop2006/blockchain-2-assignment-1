// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract VulnerableAccess {
    address public owner;

    constructor() payable {
        owner = msg.sender;
    }

    // Intentionally vulnerable: anyone can take ownership.
    function setOwner(address newOwner) external {
        owner = newOwner;
    }

    // Intentionally vulnerable: no access check.
    function withdrawAll() external {
        (bool ok, ) = msg.sender.call{value: address(this).balance}("");
        require(ok, "withdraw failed");
    }
}
