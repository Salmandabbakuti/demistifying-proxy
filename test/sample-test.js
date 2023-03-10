/*
* This script can only be run through Hardhat, and not through node directly.
* Since ethers or any other hardhat plugins are globally available to Hardhat Runtime Environment. So we are not importing them explicitly.
* So when running this script through node, we will get an error saying that ethers or any other plugins not defined error.
*/

const { assert } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

async function lookupStorageAt(address, slot) {
  const value = await ethers.provider.getStorageAt(address, slot);
  return parseInt(value);
};

describe("Contract Tests", function () {
  async function deployFixture() {
    // Get the ContractFactory and Signers here.
    const proxyFactory = await ethers.getContractFactory("Proxy");
    const logic1Factory = await ethers.getContractFactory("Logic1");
    const logic2Factory = await ethers.getContractFactory("Logic2");

    // Deploy the contract specifying the constructor arguments
    const proxy = await proxyFactory.deploy();
    await proxy.deployed();
    const logic1 = await logic1Factory.deploy();
    await logic1.deployed();
    const logic2 = await logic2Factory.deploy();
    await logic2.deployed();
    const proxyAsLogic1 = logic1Factory.attach(proxy.address); // Attach the proxy address to the logic1 contract to trick the abi to call logic functions
    const proxyAsLogic2 = logic2Factory.attach(proxy.address);
    return { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 };
  };

  it("Should work with upgrades", async function () {
    const { proxy, logic1, logic2, proxyAsLogic1, proxyAsLogic2 } = await loadFixture(deployFixture);

    //  Test the contract V1
    await proxy.changeImplementation(logic1.address);
    await proxyAsLogic1.changeX(49);
    assert.equal(await lookupStorageAt(proxy.address, "0x0"), 49);
    assert.equal(await logic1.x(), 0); // x value still should be 0 in logic1 contract since function call delegeted to proxy storage

    //  Test the contract V2
    await proxy.changeImplementation(logic2.address);
    // await proxyAsLogic2.changeX(50);
    assert.equal(await lookupStorageAt(proxy.address, "0x0"), 49); // x value should be 49 in proxy storage as v1
    assert.equal(await logic2.x(), 0); // x value still should be 0 in logic2 contract since function call delegeted to proxy storage
    await proxyAsLogic2.tripleX();
    assert.equal(await lookupStorageAt(proxy.address, "0x0"), 147); // x value should be 147 in proxy storage as v2
  });
});
