// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./ChildContract.sol";

contract Factory {
    address[] private deployedContracts;
    mapping(address => bool) public isDeployedByFactory;

    event ChildDeployed(address indexed child, address indexed owner, bool usedCreate2, bytes32 salt);

    function deployWithCreate(string calldata _name) external payable returns (address child) {
        ChildContract newChild = new ChildContract{value: msg.value}(msg.sender, _name);
        child = address(newChild);
        _recordDeployment(child, false, bytes32(0));
    }

    function deployWithCreate2(string calldata _name, bytes32 salt) external payable returns (address child) {
        ChildContract newChild = new ChildContract{salt: salt, value: msg.value}(msg.sender, _name);
        child = address(newChild);
        _recordDeployment(child, true, salt);
    }

    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }

    function getDeployedCount() external view returns (uint256) {
        return deployedContracts.length;
    }

    function _recordDeployment(address child, bool usedCreate2, bytes32 salt) internal {
        deployedContracts.push(child);
        isDeployedByFactory[child] = true;
        emit ChildDeployed(child, msg.sender, usedCreate2, salt);
    }
}
