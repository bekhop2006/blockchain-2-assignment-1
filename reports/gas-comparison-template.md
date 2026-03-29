## Task 1 - CREATE vs CREATE2 Gas

| Method | Tx hash | Gas used | Notes |
|---|---|---:|---|
| CREATE | `paste-hash` | `paste-gas` | Child deployed via `deployWithCreate` |
| CREATE2 | `paste-hash` | `paste-gas` | Child deployed via `deployWithCreate2` |

## Task 3 - Optimization Summary

| Optimization | Before (gas) | After (gas) | Saved | Explanation |
|---|---:|---:|---:|---|
| Storage packing | | | | Reordered `uint8` fields together |
| Immutable/constant | | | | Owner is immutable, cap is constant |
| Calldata over memory | | | | External read-only params moved to calldata |
| Short-circuiting | | | | Cheap condition checked first |
| Unchecked arithmetic | | | | Loop increment in unchecked block |
| Caching storage reads | | | | `total` cached into local variable |
| Event-based logging | | | | Replaced non-essential storage write with event |
