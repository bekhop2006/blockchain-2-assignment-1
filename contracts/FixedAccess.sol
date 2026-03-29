// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";

contract FixedAccess is Ownable {
    constructor() payable Ownable(msg.sender) {}

    function withdrawAll() external onlyOwner {
        (bool ok, ) = owner().call{value: address(this).balance}("");
        require(ok, "withdraw failed");
    }
}
