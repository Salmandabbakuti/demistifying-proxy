require('@nomicfoundation/hardhat-toolbox');

task("deploy", "Deploys Contract", async () => {
  const contractFactory = await ethers.getContractFactory("Storage");
  const contract = await contractFactory.deploy("Hello, Hardhat!");
  await contract.deployed();
  console.log("contract deployed at:", contract.address);
});

task("lookup", "Storage Lookup")
  .addParam("address", "The contract address to lookup storage at")
  .setAction(async ({ address }) => {
    const greeting = await ethers.provider.getStorageAt(address, "0x0");
    const x = await ethers.provider.getStorageAt(address, "0x1");
    const y = await ethers.provider.getStorageAt(address, "0x2");
    // for mapping(uint => uint) myMap;
    const myMapPaddedSlot = ethers.utils.hexZeroPad("0x3", 32);
    const myMap12paddedKey = ethers.utils.hexZeroPad(12, 32);
    const myMap23paddedKey = ethers.utils.hexZeroPad(23, 32);
    const myMap12Slot = ethers.utils.keccak256(myMap12paddedKey + myMapPaddedSlot.slice(2));
    const myMap23Slot = ethers.utils.keccak256(myMap23paddedKey + myMapPaddedSlot.slice(2));
    const myMap12Value = await ethers.provider.getStorageAt(address, myMap12Slot);
    const myMap23Value = await ethers.provider.getStorageAt(address, myMap23Slot);
    console.log("greeting:", ethers.utils.toUtf8String(greeting));
    console.log("x:", parseInt(x));
    console.log("y:", parseInt(y));
    console.log("myMap12:", parseInt(myMap12Value));
    console.log("myMap23:", parseInt(myMap23Value));
  });

module.exports = {
  defaultNetwork: "local",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
    },
  },
  solidity: {
    version: "0.8.16"
  }
};