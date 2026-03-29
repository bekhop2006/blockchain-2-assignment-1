// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Unoptimized {
    uint256 public total;
    uint8 public smallA;
    uint256 public lastUpdated;
    uint8 public smallB;
    address public owner;
    string public note;
    uint256 public saveCounter;

    event BatchProcessed(uint256 sum);

    constructor() {
        owner = msg.sender;
    }

    function updateNote(string memory _note) external {
        note = _note;
    }

    function processNumbers(uint256[] memory values, bool shouldSave) external returns (uint256) {
        require(values.length > 0, "empty");
        require(msg.sender == owner, "not owner");

        uint256 sum = 0;
        for (uint256 i = 0; i < values.length; i++) {
            sum = sum + values[i];
        }

        total = total + sum;
        lastUpdated = block.timestamp;

        if (shouldSave) {
            saveCounter = saveCounter + 1;
        }

        emit BatchProcessed(sum);
        return sum;
    }
}
