// GENERIC
const Web3 = require('web3')
const r2 = require('r2')

var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/YUgGWR2D7ZEwiXgZS9rG"))

// ETH
const ethscan = require('etherscan-api').init('YourApiKey','ropsten'); // It is necesary, i think that you can put your APiKey if you register. 
const EthTx = require("ethereumjs-tx")
var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey')
//
//
//             ETHEREUM ROPSTEN TESTNET
//
//

/**
 * Get Address from a seed/mnemonic.
 * @param {object} seed - Object which include PrivateKey.
 * @returns {object} - Returns PrivateKey, PublicKey and Address.
 * @example - getAddressETH('asjdnasd fjdsasdnfjsd sjdfbnsd fnsdj fsdkio fjsido nfhjidso oisdjhf sodijf sodfij sdoifj sdpifj',"123asdasd4")
 * { PubicKey: '0x2036646b3fd79dee41351f727f0a6e10d0e7f98585961bc14e7aadaf5f4b66ab7cc0a3bceddd265b830fd58f9b3abe56cee83d314f5c1c43182e5b4130511370',
  PrivateKey: '0x2f93c0519f4f763167e23450bd667567bf7aa8a31b9763ea4c6a57401d370583',
  Address: '0xdff64b12e96050db80475b13e2bfa3f0a4a4ac68' }
 */
function getAddressETH(seed){
	var masterseed = bip39.mnemonicToSeed(seed.mnemonic, seed.password);
	var hdnode = hdkey.fromMasterSeed(masterseed);
	return { PubicKey: hdnode.getWallet().getPublicKeyString(),PrivateKey:hdnode.getWallet().getPrivateKeyString(),Address: hdnode.getWallet().getAddressString()}
}
/**
 * Get Balance from an Address.
 * @param {string} addr - Balance of address. 
 * @returns {number} - Returns balance of address.
 * @example - getBalanceETH("0x29e0eAFbCD3C76856ff3C80f00782e8D6624eFd0")
 * Should return: 392229999999832000 , You can check it here:  https://ropsten.etherscan.io/address/0x29e0eAFbCD3C76856ff3C80f00782e8D6624eFd0
 */
async function getBalanceETH(addr){
	let balance = await ethscan.account.balance(addr);

	return balance.result
}
/**
 * Get Last Transactions from an Address.
 * @param {string} addr - Balance of address. 
 * @returns {object} - Returns last transactions of address.
 * @example - getLastTransactionsEth("0x29e0eAFbCD3C76856ff3C80f00782e8D6624eFd0")
 * Should return: Transactions List , You can check it here:  https://ropsten.etherscan.io/address/0x29e0eafbcd3c76856ff3c80f00782e8d6624efd0
 */
async function getLastTransactionsEth(addr){
    let _url = 'http://api-ropsten.etherscan.io/api?module=account&action=txlist&address='+addr+'&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken';
    let request_answer = await r2(_url).text;
    try {
	return JSON.parse(request_answer).result
    } catch (e) {
	return request_answer;
    }
}

/**
 * Transfer from an Address to another.
 * @param {string} from - Sender address. 
 * @param {string} to - Receiver Address. 
 * @param {number} amount - Amount to send. 
 * @param {number} fee - Fee to pay. 
 * @param {string} pvtkey - Private key of addr sender. 
 * @returns {string} - Returns tx.
 * @example - transferETH('0x7644d4fFA61cD02Aa8bA0a2822c1a987AE1eDc99','0x429b7ad15413755a4ccb706e67903ebf12a2e36d',3,25000000000,'74dc7b52f81fe992ae7d06b120baa1088746b02378b546c6bde560017435c8e3')
 * Should return: Tx Hash, example: 0x07b50b723ec2dd40011a10778db80e04b984110c03f5fdc0c9fc8ce49c5ad6e0
 * You can check it here: https://ropsten.etherscan.io/tx/0x07b50b723ec2dd40011a10778db80e04b984110c03f5fdc0c9fc8ce49c5ad6e0
 */

async function getNonce(from){
    let nonce = await ethscan.proxy.eth_getTransactionCount(from);
    try {
	let nonceF = nonce.result;
	return nonceF;
    } catch (e) {
	return nonce;
    }
}

async function transferETH(from,to,amount,gasPrice,pvtKey){
	let rawTx = {
	from: from,
	nonce: await web3.eth.getTransactionCount(from),
	to: to,
	gasPrice: web3.toHex(gasPrice),
	gasLimit: web3.toHex(50000),
	value: web3.toHex(web3.toWei(amount,'ether')),
	data: ""
	}
	let tx = new EthTx(rawTx)
	let pKey1x = new Buffer(pvtKey,'hex')
	console.log(tx)
	tx.sign(pKey1x)
	console.log(tx)
	var trans = ethscan.proxy.eth_sendRawTransaction(tx.serialize().toString('hex'));
	trans.then(function(balanceData){

  	return balanceData.result
	});
}
transferETH('0x7644d4fFA61cD02Aa8bA0a2822c1a987AE1eDc99','0x429b7ad15413755a4ccb706e67903ebf12a2e36d',1,25000000000,'74dc7b52f81fe992ae7d06b120baa1088746b02378b546c6bde560017435c8e3')
//transferETH('0xDF718FaDd1ef803F3f6d95deC18C1797c756fe60','0x95195A7ea2206bb1770F0AC1a35a597F34f0F3A6',1,22000000000,'74dc7b52f81fe992ae7d06b120baa1088746b02378b546c6bde560017435c8e3')
module.exports = {
	transferETH: transferETH,
	getLastTransactionsEth: getLastTransactionsEth,
	getBalanceETH: getBalanceETH,
	getAddressETH: getAddressETH,
  }

  