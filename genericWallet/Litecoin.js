// GENERIC
const r2 = require('r2')
const bigi = require('bigi');
const btcjs = require('bitcoinjs-lib');
//
//
//             LITCOIN TESTNET
//
//

/**
 * Get Balance from an Address.
 * @param {string} addr - Balance of address. 
 * @returns {string} - Returns balance of address in LiteCoin.
 * @example - getBalanceLTC("mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ")
 * Should return: 10.00000000, You can check it here: https://chain.so/api/v2/get_address_balance/LTCTEST/mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ
 */

async function getBalanceLTC(addr){
    let _url = 'https://chain.so/api/v2/get_address_balance/LTCTEST/'+ addr;
    let request_answer = await r2(_url).text;
    
    try {
        return JSON.parse(request_answer).data.confirmed_balance
    } catch (e) {
    return [];
    }
}

/**
 * Get Address from a seed/PrivateKey.
 * @param {object} seed - Object which include PrivateKey.
 * @returns {object} - Returns PrivateKey and Address.
 * @example - getAddressLTC({PrivateKey: "51593731417393989063100715043982327130617014464744174480514247935560226892240"}) 
 * Should return: { address: 'mruPY1KSoeEyGfMGnbhmmb7jxekRiA5LGZ',
                 PrivateKey: '721104631a667d244f52918b4878027874dde59b98ad8d96b08af401434ae9d0' }
 */
function getAddressLTC(seed){
	var pvtKey = bigi.fromDERInteger(seed.PrivateKey)
	key_pair = new btcjs.ECPair(pvtKey, null,{network: btcjs.networks.testnet});
	return {address: key_pair.getAddress(),PrivateKey: pvtKey.toHex()}
}
module.exports = {
    getBalanceLTC: getBalanceLTC,
    getAddressLTC: getAddressLTC
  }