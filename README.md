# Assignment 1 - Advanced Solidity Patterns & Security Fundamentals

This repository contains a complete Hardhat implementation for:

- Task 1: Factory pattern with `CREATE` and `CREATE2`
- Task 2: UUPS upgradeable contracts (V1 -> V2)
- Task 3: Gas optimization before/after comparison contracts
- Task 4: Inline assembly basics (caller/sload/sstore/bitwise math)
- Task 5: Reentrancy and access-control vulnerabilities + fixes
- Task 6: Slither report templates and rerun workflow
- Task 7: Written-analysis templates

## Quick Start

```bash
npm install
npx hardhat compile
npx hardhat test
```

## Task Commands

```bash
# Task 1 deployment + gas logging
npm run task1:deploy

# Task 2 UUPS deploy and upgrade flow
npm run task2:deploy-v1
npm run task2:upgrade-v2

# Task 2 one-command local demo (recommended)
npm run task2:demo
```

## Reports and Screenshots

- Use `reports/gas-comparison-template.md` for Task 1 and Task 3 tables.
- Use `reports/slither-summary-template.md` for Task 6 findings.
- Use `reports/written-analysis-template.md` for Task 7 theory answers.
- Save screenshots in `screenshots/`.

## Slither

Install and run:

```bash
pip3 install slither-analyzer
slither . --exclude-dependencies > reports/slither-before.txt
# apply fixes
slither . --exclude-dependencies > reports/slither-after.txt
```
