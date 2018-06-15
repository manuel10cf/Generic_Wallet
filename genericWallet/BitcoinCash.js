// GENERIC
const bigi = require('bigi');
const btcjs = require('bitcoinjs-lib');

const blocktrail = require('blocktrail-sdk');
const client = blocktrail.BlocktrailSDK({apiKey: "MY_APIKEY", apiSecret: "MY_APISECRET", network: "tBCC", testnet: false}); // Podes meterle tu API_key
const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
const bch = require('@owstack/bch-lib')

//
//
//             BITCOIN CASH TESTNET
//
//
/**
 * Get Balance from a Address.
 * @param {string} addr - Balance of address. 
 * @returns {number} - Returns balance of address in 'satoshi'.
 * @example - getBalanceBCH("mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ") 
 * Should return: 1950000000, You can check it here: https://www.blocktrail.com/tBCC/address/mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ
 */
async function getBalanceBCH(addr){
	var balance = await client.address(addr)	
	console.log(balance.balance)
	return balance
}
async function getLastTransactionsBCH(addr){
	var lastTx = await client.addressTransactions(addr,
	function(err, addressTxs) {});
	return lastTx
	}
/**
 * Get Address from a seed/PrivateKey.
 * @param {object} seed - Object which include PrivateKey.
 * @returns {object} - Returns PrivateKey and Address.
 * @example - getAddressBCH({PrivateKey: "51593731417393989063100715043982327130617014464744174480514247935560226892240"}) 
 * Should return: { address: 'mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ',
  PrivateKey: '721104631a667d244f52918b4878027874dde59b98ad8d96b08af401434ae9d0' }
 */
function getAddressBCH(seed){
	var pvtKey = bigi.fromDERInteger(seed.PrivateKey)
	key_pair = new btcjs.ECPair(pvtKey, null,{network: btcjs.networks.testnet});
	return {address: key_pair.getAddress(),PrivateKey: pvtKey.toHex()}
}
module.exports = {
	getLastTransactionsBCH: getLastTransactionsBCH,
	getBalanceBCH: getBalanceBCH,
	getAddressBCH: getAddressBCH,
  }