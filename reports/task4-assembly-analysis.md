## Task 4 - Inline Assembly Analysis

This task demonstrates three assembly operations:

1. `caller()` to read transaction caller (`senderAssembly`)
2. Bitwise arithmetic to check power-of-two (`isPowerOfTwoAssembly`)
3. Direct storage operations with `sstore` and `sload` (`setValueAssembly`, `getValueAssembly`)

From local gas output:

- `setValueSolidity` average gas: `43516`
- `setValueAssembly` average gas: `26461`
- Improvement: `17055` gas on this benchmark path

## When Assembly Is Justified

Assembly is justified when there is measurable gas impact in a hot path, or when Solidity cannot express an operation efficiently enough (e.g., custom memory layouts, low-level call handling, highly optimized math).

## Risks of Assembly

- Reduced readability and maintainability
- Higher risk of subtle correctness bugs
- Less compile-time safety and type checking
- Easier to introduce storage corruption or memory safety errors

Because of these risks, assembly should be isolated to small, well-tested blocks with clear comments and benchmark evidence.
