const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const Factory = await hre.ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.waitForDeployment();
  console.log("Factory:", await factory.getAddress());

  const createTx = await factory.deployWithCreate("Child-Create", {
    value: hre.ethers.parseEther("0.01"),
  });
  const createReceipt = await createTx.wait();
  console.log("CREATE gas used:", createReceipt.gasUsed.toString());

  const salt = hre.ethers.keccak256(hre.ethers.toUtf8Bytes("child-via-create2-1"));
  const create2Tx = await factory.deployWithCreate2("Child-Create2", salt, {
    value: hre.ethers.parseEther("0.01"),
  });
  const create2Receipt = await create2Tx.wait();
  console.log("CREATE2 gas used:", create2Receipt.gasUsed.toString());

  const deployed = await factory.getDeployedContracts();
  console.log("Deployed children:", deployed);

  console.log("Gas delta (create2 - create):", (create2Receipt.gasUsed - createReceipt.gasUsed).toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
