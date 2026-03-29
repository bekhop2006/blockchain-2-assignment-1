## Task 1 - Factory Deployment Log

Command:

```bash
npm run task1:deploy
```

Observed output:

- Deployer: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Factory: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- CREATE gas used: `266811`
- CREATE2 gas used: `250584`
- CREATE2 - CREATE: `-16227` gas

### Gas Comparison Table

| Method | Gas Used | Difference vs CREATE |
|---|---:|---:|
| CREATE | 266811 | 0 |
| CREATE2 | 250584 | -16227 |

## Task 2 - UUPS Upgrade Demonstration Log

Command:

```bash
npm run task2:demo
```

Observed output:

- Proxy deployed: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`
- Counter initially: `11`
- Counter before upgrade: `13`
- Counter immediately after upgrade: `13` (state preserved)
- Counter after decrement: `12`
- Counter after reset: `0`
