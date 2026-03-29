const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 5B - Access control misconfiguration", function () {
  it("any address can seize owner and withdraw in vulnerable contract", async function () {
    const [deployer, attacker] = await ethers.getSigners();

    const VulnerableAccess = await ethers.getContractFactory("VulnerableAccess", deployer);
    const vulnerable = await VulnerableAccess.deploy({ value: ethers.parseEther("1") });
    await vulnerable.waitForDeployment();

    await (await vulnerable.connect(attacker).setOwner(attacker.address)).wait();
    expect(await vulnerable.owner()).to.equal(attacker.address);

    await (await vulnerable.connect(attacker).withdrawAll()).wait();
    expect(await ethers.provider.getBalance(await vulnerable.getAddress())).to.equal(0n);
  });

  it("only owner can withdraw in fixed contract", async function () {
    const [owner, attacker] = await ethers.getSigners();

    const FixedAccess = await ethers.getContractFactory("FixedAccess", owner);
    const fixed = await FixedAccess.deploy({ value: ethers.parseEther("1") });
    await fixed.waitForDeployment();

    await expect(fixed.connect(attacker).withdrawAll()).to.be.revertedWithCustomError(
      fixed,
      "OwnableUnauthorizedAccount"
    );

    await (await fixed.connect(owner).withdrawAll()).wait();
    expect(await ethers.provider.getBalance(await fixed.getAddress())).to.equal(0n);
  });
});
