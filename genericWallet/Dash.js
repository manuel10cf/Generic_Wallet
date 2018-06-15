const r2 = require('r2')

//
//
//             DASH TESTNET
//
//


/**
 * Get Balance from an Address.
 * @param {string} addr - Balance of address. 
 * @returns {string} - Returns balance of address in LiteCoin.
 * @example - getBalanceDASH("ySZg2TXSPY6mxPP9CxGcMvsCmhfU2y3v9a")
 * Should return: , You can check it here: 
 */

async function getBalanceDASH(addr){
    let _url = 'https://chain.so/api/v2/get_address_balance/DASHTEST/'+addr;
    let request_answer = await r2(_url).text;
    
    try {
        return JSON.parse(request_answer).data.confirmed_balance
    } catch (e) {
    return [];
    }
}

getBalanceDASH("ySZg2TXSPY6mxPP9CxGcMvsCmhfU2y3v9a")
module.exports = {
	getBalanceDASH: getBalanceDASH,
  }