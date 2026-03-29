// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Optimized {
    // (1) STORAGE PACKING: these two uint8 values share one slot.
    uint8 public smallA;
    uint8 public smallB;

    uint256 public total;
    uint256 public lastUpdated;

    // (2) IMMUTABLE: set once at deployment, cheaper read than storage.
    address public immutable owner;

    // (3) CONSTANT: compile-time constant, no storage slot.
    uint256 public constant MAX_BATCH = 1_000;

    string public note;

    event BatchProcessed(uint256 sum);
    // (7) EVENT-BASED LOGGING: avoid unnecessary storage writes.
    event SaveAction(address indexed caller, uint256 indexed atTime);

    constructor() {
        owner = msg.sender;
    }

    function updateNote(string calldata _note) external {
        // (4) SHORT-CIRCUITING: cheap check first.
        require(msg.sender == owner && bytes(_note).length > 0, "invalid call");
        note = _note;
    }

    function processNumbers(uint256[] calldata values, bool shouldSave) external returns (uint256 sum) {
        // (4) SHORT-CIRCUIT: fail fast before expensive checks.
        require(msg.sender == owner, "not owner");
        require(values.length > 0 && values.length <= MAX_BATCH, "bad length");

        // (6) CACHING STORAGE READS.
        uint256 runningTotal = total;
        uint256 len = values.length;

        for (uint256 i = 0; i < len; ) {
            runningTotal += values[i];
            // (5) UNCHECKED ARITHMETIC: loop counter cannot overflow here.
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
