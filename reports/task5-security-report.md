## Task 5 - Security Report

### Vulnerability A: Reentrancy

**Affected contract:** `VulnerableVault.sol`  
**Root cause:** External call to `msg.sender` happens before state update.  
**Impact:** An attacker can repeatedly re-enter `withdraw` and drain vault funds belonging to other users.

### Exploit Summary

`Attacker.sol` deposits and calls `withdraw`, then re-enters from `receive()`. Because the vault updates state only after interaction, the same balance check is bypassed across nested calls.

### Remediation

Implemented `FixedVault.sol` using:

- Checks-Effects-Interactions order (state update before external transfer)
- OpenZeppelin `ReentrancyGuard` with `nonReentrant`

### Verification

In tests:

- Exploit succeeds against `VulnerableVault`
- Exploit reverts/fails against `FixedVault`

---

### Vulnerability B: Access Control Misconfiguration

**Affected contract:** `VulnerableAccess.sol`  
**Root cause:** Privileged functions `setOwner` and `withdrawAll` are public with no access checks.  
**Impact:** Any address can seize ownership and withdraw all funds.

### Remediation

Implemented `FixedAccess.sol` using OpenZeppelin `Ownable` and `onlyOwner`.

### Verification

In tests:

- Non-owner call reverts with `OwnableUnauthorizedAccount`
- Owner call succeeds

---

## Conclusion

Both vulnerabilities are common in production incidents. The fixes demonstrate standard defensive patterns:

- strict access control
- CEI ordering
- reentrancy guards
- negative tests to verify exploit resistance
