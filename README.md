# Solidity Storage Lookup

This project demonstrates how to lookup different storage slots for a given contract.

> Recommended to use Node.js v14+ and npm v7+.

Try running some of the following tasks:

```shell
npm install

# starts local node
npx hardhat node

# compile contracts
npx hardhat compile

# deploy contract defined in tasks on specified network
npx hardhat deploy --network local

# deploy contract in scripts/deploy.js on specified network
npx hardhat run scripts/deploy.js --network local

# lookup storage slots for contract
npx hardhat lookup --address <contract address>

# remove all compiled and deployed artifacts
npx hardhat clean

# show help
npx hardhat help
```

#### Expected Output:

```
D:\salman\solidity-storage-starter>npx hardhat lookup --address 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
greeting: Hello, Hardhat!▲
x: 12
y: 97
myMap12: 34
myMap23: 47
```
