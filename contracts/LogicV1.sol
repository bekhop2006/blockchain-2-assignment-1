// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract LogicV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 internal counter;

    function initialize(uint256 startValue) public initializer {
        __Ownable_init(msg.sender);
        counter = startValue;
    }

    function increment() external {
        counter += 1;
    }

    function get() external view returns (uint256) {
        return counter;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}
