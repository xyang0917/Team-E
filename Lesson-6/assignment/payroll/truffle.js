
var HDWalletProvider = require("truffle-hdwallet-provider") // 调用以太坊钱包的中间库
const infura_apikey = 'EH9RCfLTQttKVqg1OS1W'    // infura申请的apikey
const mnemonic = 'early submit sleep rabbit viable hover divide prevent song water rocket crush'         // 钱包助记词

module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*"
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey)  // 最后一个参数指定助记词恢复的帐号索引
            },
            network_id: 3,
        },
        main: {
            provider: function () {
                return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/" + infura_apikey)
            },
            network_id: 3,
            gas: 3012388,
            gasPrice: 1000000000
        }
    }
};