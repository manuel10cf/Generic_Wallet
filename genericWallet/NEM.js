// GENERIC
const Web3 = require('web3')
const solc = require("solc")
const bigi = require('bigi');
const r2 = require('r2')
const fs = require('fs');
var generator = require('generate-password');
// NEM
var nem = require('nem-sdk').default
var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

//
//
//             NEM TESTNET
//
//

/**
 * Get Balance from an Address.
 * @param {string} addr - Balance of address. 
 * @returns {string} - Returns balance of address in NEM.
 * @example - getBalanceNEM("TB37VH34IMRDSOSRHQ5QEGJVRQKQBBANDAFT76O3")
 * Should return: 99500000, You can check it here: http://bob.nem.ninja:8765/#/search/TB37VH34IMRDSOSRHQ5QEGJVRQKQBBANDAFT76O3
 */

async function getBalanceNEM(addr){
	let res = await nem.com.requests.account.data(endpoint, addr)
	console.log(res.account.balance)
	console.log(typeof(res.account.balance))
	return res.account.balance;
}

/**
 * Get Address from a seed/PrivateKey.
 * @param {object} seed - Object which include PrivateKey.
 * @returns {object} - Returns PrivateKey and Address.
 * @example - getAddressNEM({PrivateKey: "c04b19edadb2c447b439ce6fa4bb6092607fea894c9a3a85b7a8e2def977d654"})
 * Should return: { privateKey: 'c04b19edadb2c447b439ce6fa4bb6092607fea894c9a3a85b7a8e2def977d654',
 				 address: 'TDGPAL62H5AZNFIUBXJG3YDJ5XUCIDUBDGIQGTQ6' }
 */
function getAddressNEM(seed){
	var privateKey = seed.PrivateKey;
	var keyPair = nem.crypto.keyPair.create(privateKey);
	var address = nem.model.address.toAddress(keyPair.publicKey.toString(), -104)
	return {privateKey: privateKey,address: address}
}
module.exports = {
	getBalanceNEM: getBalanceNEM,
	getAddressNEM: getAddressNEM,
  }