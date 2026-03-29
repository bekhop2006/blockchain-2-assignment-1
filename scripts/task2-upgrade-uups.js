const hre = require("hardhat");
const { upgrades } = hre;
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const reportPath = path.join(__dirname, "..", "reports", "uups-proxy-address.json");
  if (!fs.existsSync(reportPath)) {
    throw new Error("Missing reports/uups-proxy-address.json. Run task2-deploy-uups first.");
  }

  const { proxyAddress } = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  console.log("Upgrading proxy at:", proxyAddress);

  const LogicV2 = await hre.ethers.getContractFactory("LogicV2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, LogicV2);
  await upgraded.waitForDeployment();

  const before = await upgraded.get();
  console.log("Counter before V2 ops:", before.toString());

  await (await upgraded.decrement()).wait();
  console.log("Counter after decrement:", (await upgraded.get()).toString());

  await (await upgraded.reset()).wait();
  console.log("Counter after reset:", (await upgraded.get()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
