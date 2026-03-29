// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract AssemblyDemo {
    uint256 public value;

    function senderSolidity() external view returns (address) {
        return msg.sender;
    }

    function senderAssembly() external view returns (address sender) {
        assembly {
            sender := caller()
        }
    }

    function isPowerOfTwoSolidity(uint256 x) external pure returns (bool) {
        return x != 0 && (x & (x - 1)) == 0;
    }

    function isPowerOfTwoAssembly(uint256 x) external pure returns (bool ok) {
        assembly {
            ok := and(iszero(iszero(x)), iszero(and(x, sub(x, 1))))
        }
    }

    function setValueSolidity(uint256 newValue) external {
        value = newValue;
    }

    function setValueAssembly(uint256 newValue) external {
        assembly {
            sstore(value.slot, newValue)
        }
    }

    function getValueAssembly() external view returns (uint256 loaded) {
        assembly {
            loaded := sload(value.slot)
        }
    }
}
