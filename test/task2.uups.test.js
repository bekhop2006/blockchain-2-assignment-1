const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Task 2 - UUPS upgrade", function () {
  it("upgrades V1 to V2 and preserves state", async function () {
    const LogicV1 = await ethers.getContractFactory("LogicV1");
    const proxy = await upgrades.deployProxy(LogicV1, [3], { kind: "uups" });
    await proxy.waitForDeployment();

    await (await proxy.increment()).wait();
    expect(await proxy.get()).to.equal(4n);

    const proxyAddress = await proxy.getAddress();
    const LogicV2 = await ethers.getContractFactory("LogicV2");
    const upgraded = await upgrades.upgradeProxy(proxyAddress, LogicV2);

    // State persists across upgrade.
    expect(await upgraded.get()).to.equal(4n);

    await (await upgraded.decrement()).wait();
    expect(await upgraded.get()).to.equal(3n);

    await (await upgraded.reset()).wait();
    expect(await upgraded.get()).to.equal(0n);
  });
});
