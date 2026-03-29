const hre = require("hardhat");
const { upgrades } = hre;
const fs = require("node:fs");
const path = require("node:path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const LogicV1 = await hre.ethers.getContractFactory("LogicV1");
  const proxy = await upgrades.deployProxy(LogicV1, [7], { kind: "uups" });
  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();
  console.log("UUPS proxy deployed:", proxyAddress);
  console.log("Initial counter:", (await proxy.get()).toString());

  const tx = await proxy.increment();
  await tx.wait();
  console.log("Counter after increment:", (await proxy.get()).toString());

  const outDir = path.join(__dirname, "..", "reports");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "uups-proxy-address.json"), JSON.stringify({ proxyAddress }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
