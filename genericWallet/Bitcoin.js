// GENERIC
const bigi = require('bigi');
const r2 = require('r2')
// BTC
const btcjs = require('bitcoinjs-lib');

//
//
//             BITCOIN TESTNET
//
//

/**
 * Get Address from a seed/PrivateKey.
 * @param {object} seed - Object which include PrivateKey.
 * @returns {object} - Returns PrivateKey and Address.
 * @example - getAddressBTC({PrivateKey: "51593731417393989063100715043982327130617014464744174480514247935560226892240"}) 
 * Should return: { address: 'mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ',
  PrivateKey: '721104631a667d244f52918b4878027874dde59b98ad8d96b08af401434ae9d0' }
 */
function getAddressBTC(seed){
	var pvtKey = bigi.fromBuffer(seed.PrivateKey)
	key_pair = new btcjs.ECPair(pvtKey, null,{network: btcjs.networks.testnet});
	console.log(key_pair.getAddress())
	return {address: key_pair.getAddress(),PrivateKey: pvtKey.toHex()}
}
/**
 * Get Balance from a Address.
 * @param {string} addr - Balance of address. 
 * @returns {number} - Returns balance of address in 'satoshi'.
 * @example - getBalanceBTC("mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ") 
 * Should return: 1000, You can check it here: https://testnet.blockexplorer.com/address/mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ
 */
async function getBalanceBTC(addr){
	let _url = 'https://testnet.blockchain.info/es/rawaddr/' + addr;
	let request_answer = await r2(_url).text;
    try {
    let balance = JSON.parse(request_answer);
	return balance.final_balance
    } catch (e) {
	return request_answer;
    }
}
// get utxos (address)
async function get_utxos(of){
    let _url = 'https://testnet.blockchain.info/es/unspent?active=' + of;
    let request_answer = await r2(_url).text;
    try {
	let unSpent = JSON.parse(request_answer).unspent_outputs;
	let utxos = unSpent[0];
    return utxos
    } catch (e) {
	return [];
    }
}
/**
 * Transfer from an Address to another.
 * @param {string} from - Sender address. 
 * @param {string} to - Receiver Address. 
 * @param {number} amount - Amount to send. 
 * @param {number} fee - Fee to pay. 
 * @param {string} pvtkey - Private key of addr sender. 
 * @returns {number} - Returns tx.
 * @example - transferBTC('mveRt7FrdrjYx4hti7hPKzoAs1m4XqPxmt','n4FJo7fquGdJqpbwhazrApmpgBjZBoGTrK',1,101320000,'23641101966610264292949835178009563610153359478260715572310807166000383336100')
 * Should return: Tx Hash, example: 010000000195eed409fb5de798c6d0d1508dbee862e4dbdbec1022914f402c1a5fc77be62d010000006a473044022068fdcba5b2405a6b18935954467e8ebd2b3fe2c321ce37b0da6ae57a784d091e0220735cff9cc704869a6fb1b3b603130816c813a45755980a120e0caa075a504f9501210350420c9206f8574a63098a64a71d5bf69584241ccbd0e578e9022fff2818a022ffffffff0201000000000000001976a914f95559df7294878b6b15b1c99c2224a2fb7a483988ac4fc30000000000001976a914a5f3d3bba0b288c6458886c85542fed15b860a0788ac00000000
 * You can check it here: https://testnet.blockexplorer.com/address/mveRt7FrdrjYx4hti7hPKzoAs1m4XqPxmt
 * You have to push tx here:  https://testnet.blockchain.info/pushtx for supporting like issues.
 */
async function transferBTC(from,to,amount,fee,pvtkey){
	var pvtkeyJS = bigi.fromBuffer(pvtkey);
	var key = new btcjs.ECPair(pvtkeyJS, null,{network: btcjs.networks.testnet});
	var tx = new btcjs.TransactionBuilder(btcjs.networks.testnet);
	var utxos = await get_utxos(from)
    var balance = await getBalanceBTC(from)
    tx.addInput(utxos.tx_hash_big_endian,utxos.tx_output_n);
	tx.addOutput(to, amount); 
	tx.addOutput(from, balance - amount - fee);
	tx.sign(0,key)
	console.log(tx.build().toHex())
	return tx.build().toHex() 
}

/**
 * Get Balance from an Address.
 * @param {string} addr - Balance of address. 
 * @returns {object} - Returns last transactions of address.
 * @example - getLastTransactionsBTC("mveRt7FrdrjYx4hti7hPKzoAs1m4XqPxmt")
 * Should return: Transactions List , You can check it here:  https://testnet.blockexplorer.com/address/mveRt7FrdrjYx4hti7hPKzoAs1m4XqPxmt
 */

async function getLastTransactionsBTC(addr){
    let _url = 'https://testnet.blockchain.info/es/rawaddr/' + addr;
	let request_answer = await r2(_url).text;
    try {
	let lastTx = JSON.parse(request_answer).txs;
    return lastTx
    } catch (e) {
	return [];
    }
}

module.exports = {
	transferBTC: transferBTC,
	getLastTransactionsBTC: getLastTransactionsBTC,
	getBalanceBTC: getBalanceBTC,
	getAddressBTC: getAddressBTC,
  }

   
