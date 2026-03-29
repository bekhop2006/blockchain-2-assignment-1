const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 3 - Gas optimization baseline checks", function () {
  it("executes equivalent paths on unoptimized and optimized contracts", async function () {
    const Unoptimized = await ethers.getContractFactory("Unoptimized");
    const unopt = await Unoptimized.deploy();
    await unopt.waitForDeployment();

    const Optimized = await ethers.getContractFactory("Optimized");
    const opt = await Optimized.deploy();
    await opt.waitForDeployment();

    const vals = [1n, 2n, 3n, 4n, 5n];
    await (await unopt.processNumbers(vals, true)).wait();
    await (await opt.processNumbers(vals, true)).wait();

    expect(await unopt.total()).to.equal(15n);
    expect(await opt.total()).to.equal(15n);
  });
});

describe("Task 4 - Inline assembly", function () {
  it("matches solidity and assembly behavior", async function () {
    const Demo = await ethers.getContractFactory("AssemblyDemo");
    const demo = await Demo.deploy();
    await demo.waitForDeployment();

    const [caller] = await ethers.getSigners();
    expect(await demo.senderSolidity()).to.equal(caller.address);
    expect(await demo.senderAssembly()).to.equal(caller.address);

    expect(await demo.isPowerOfTwoSolidity(16)).to.equal(true);
    expect(await demo.isPowerOfTwoAssembly(16)).to.equal(true);
    expect(await demo.isPowerOfTwoAssembly(18)).to.equal(false);

    await (await demo.setValueSolidity(77)).wait();
    expect(await demo.getValueAssembly()).to.equal(77n);
    await (await demo.setValueAssembly(88)).wait();
    expect(await demo.value()).to.equal(88n);
  });
});
