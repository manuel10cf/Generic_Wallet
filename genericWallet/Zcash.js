// ZCASH
var zbitcore = require('zcash-bitcore-lib')
//
//
//             ZCASH TESTNET
//
//

/**
 * Get Address from a seed/PrivateKey.
 * @param {object} seed - Object which include PrivateKey.
 * @returns {object} - Returns PrivateKey and Address.
 * @example - getAddressZEC({PrivateKey: 'c1a66c7734d333984e9bf99179e4a2c590359d2579e3edbb1c9679a4b7aa9e65})
 */
function getAddressZEC(seed){
	var privateKey = seed.PrivateKey;
	var address = privateKey.toAddress();
	return {PrivateKey: privateKey, Address: address}
}


module.exports = {
	getAddressZEC: getAddressZEC,
  }