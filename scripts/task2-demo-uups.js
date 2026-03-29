const hre = require("hardhat");
const { upgrades } = hre;

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const LogicV1 = await hre.ethers.getContractFactory("LogicV1");
  const proxy = await upgrades.deployProxy(LogicV1, [11], { kind: "uups" });
  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  console.log("Proxy address:", proxyAddress);
  console.log("Counter initially:", (await proxy.get()).toString());

  await (await proxy.increment()).wait();
  await (await proxy.increment()).wait();
  console.log("Counter before upgrade:", (await proxy.get()).toString());

  const LogicV2 = await hre.ethers.getContractFactory("LogicV2");
  const upgraded = await upgrades.upgradeProxy(proxyAddress, LogicV2);
  await upgraded.waitForDeployment();
  console.log("Counter immediately after upgrade (state preserved):", (await upgraded.get()).toString());

  await (await upgraded.decrement()).wait();
  console.log("Counter after decrement:", (await upgraded.get()).toString());

  await (await upgraded.reset()).wait();
  console.log("Counter after reset:", (await upgraded.get()).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
