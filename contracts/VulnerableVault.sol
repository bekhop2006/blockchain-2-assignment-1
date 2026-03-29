// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract VulnerableVault {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "insufficient");

        // Vulnerable external call before state update.
        (bool ok, ) = msg.sender.call{value: amount}("");
        // Deliberately unsafe for teaching: failed external call does not revert.
        ok;

        // Deliberately unsafe placement of state update enables reentrancy.
        balances[msg.sender] = 0;
    }

    function vaultBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
