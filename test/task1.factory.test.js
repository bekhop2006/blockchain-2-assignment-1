const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 1 - Factory pattern", function () {
  it("deploys children via CREATE and CREATE2 and stores addresses", async function () {
    const [owner] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("Factory");
    const factory = await Factory.deploy();
    await factory.waitForDeployment();

    await (await factory["deployWithCreate(string)"]("alpha", { value: ethers.parseEther("0.1") })).wait();
    const salt = ethers.keccak256(ethers.toUtf8Bytes("salt-1"));
    await (await factory["deployWithCreate(string,bytes32)"]("beta", salt, { value: ethers.parseEther("0.2") })).wait();

    const deployed = await factory.getDeployedContracts();
    expect(deployed.length).to.equal(2);
    expect(await factory.isDeployedByFactory(deployed[0])).to.equal(true);
    expect(await factory.isDeployedByFactory(deployed[1])).to.equal(true);

    const Child = await ethers.getContractFactory("ChildContract");
    const childA = Child.attach(deployed[0]);
    const childB = Child.attach(deployed[1]);

    expect(await childA.owner()).to.equal(owner.address);
    expect(await childB.owner()).to.equal(owner.address);
    expect(await childA.getBalance()).to.equal(ethers.parseEther("0.1"));
    expect(await childB.getBalance()).to.equal(ethers.parseEther("0.2"));
  });
});
