// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Optimized {
    uint8 public smallA;
    uint8 public smallB;

    uint256 public total;
    uint256 public lastUpdated;

    address public immutable owner;

    uint256 public constant MAX_BATCH = 1_000;

    string public note;

    event BatchProcessed(uint256 sum);
    event SaveAction(address indexed caller, uint256 indexed atTime);

    constructor() {
        owner = msg.sender;
    }

    function updateNote(string calldata _note) external {

        require(msg.sender == owner && bytes(_note).length > 0, "invalid call");
        note = _note;
    }

    function processNumbers(uint256[] calldata values, bool shouldSave) external returns (uint256 sum) {
        require(msg.sender == owner, "not owner");
        require(values.length > 0 && values.length <= MAX_BATCH, "bad length");

        uint256 runningTotal = total;
        uint256 len = values.length;

        for (uint256 i = 0; i < len; ) {
            runningTotal += values[i];
            unchecked {
                ++i;
            }
        }

        total = runningTotal;
        lastUpdated = block.timestamp;

        if (shouldSave) {
            emit SaveAction(msg.sender, block.timestamp);
        }

        emit BatchProcessed(runningTotal);
        return runningTotal;
    }
}
