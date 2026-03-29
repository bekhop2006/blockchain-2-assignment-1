// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "./LogicV1.sol";

contract LogicV2 is LogicV1 {
    function decrement() external {
        require(counter > 0, "Counter already zero");
        counter -= 1;
    }

    function reset() external {
        counter = 0;
    }
}
