const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Task 5A - Reentrancy", function () {
  it("attacker drains vulnerable vault", async function () {
    const [deployer, victim, attackerEoa] = await ethers.getSigners();

    const VulnerableVault = await ethers.getContractFactory("VulnerableVault", deployer);
    const vault = await VulnerableVault.deploy();
    await vault.waitForDeployment();

    await (await vault.connect(victim).deposit({ value: ethers.parseEther("5") })).wait();

    const Attacker = await ethers.getContractFactory("Attacker", attackerEoa);
    const attacker = await Attacker.deploy(await vault.getAddress());
    await attacker.waitForDeployment();

    await (
      await attacker.connect(attackerEoa).attack(ethers.parseEther("0.5"), { value: ethers.parseEther("0.5") })
    ).wait();

    expect(await ethers.provider.getBalance(await vault.getAddress())).to.equal(0n);
  });

  it("fixed vault prevents reentrancy drain", async function () {
    const [_, victim, attackerEoa] = await ethers.getSigners();

    const FixedVault = await ethers.getContractFactory("FixedVault");
    const fixed = await FixedVault.deploy();
    await fixed.waitForDeployment();

    await (await fixed.connect(victim).deposit({ value: ethers.parseEther("5") })).wait();

    // Reuse attacker interface against fixed vault address by low-level call attempt.
    const Attacker = await ethers.getContractFactory("Attacker", attackerEoa);
    const attacker = await Attacker.deploy(await fixed.getAddress());
    await attacker.waitForDeployment();

    await expect(
      attacker.connect(attackerEoa).attack(ethers.parseEther("0.5"), { value: ethers.parseEther("0.5") })
    ).to.be.reverted;

    expect(await ethers.provider.getBalance(await fixed.getAddress())).to.be.greaterThan(0n);
  });
});
