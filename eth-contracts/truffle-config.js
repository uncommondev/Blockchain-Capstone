const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "ADD YOUR 12 WORD MNEMONIC HERE";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() { 
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/***`);
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  }
};