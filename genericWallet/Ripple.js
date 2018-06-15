// GENERIC
const bigi = require('bigi');
const RippleAPI = require('ripple-lib').RippleAPI;
const RippleAddr=require("ripple-keypairs")

//
//
//             RIPPLE TESTNET
//
//
// Set de server.
const api = new RippleAPI({
    server: 'wss://s.altnet.rippletest.net:51233' // Public rippled server
  });
/**
 * Get Balance from an Address.
 * @param {string} addr - Balance of address. 
 * @returns {string} - Returns balance of address in Ripple.
 * @example -  getBalanceXRP("rDJmefx64jxgHTdUf1sr9VLdZPBoHXCYMP")
 * Should return: 10000.
 */
  async function getBalanceXRP(addr){
      await api.connect()
      let balance = await api.getAccountInfo(addr);
      await api.disconnect()
      return balance
  }
/**
 * Transfer from an Address to another.
 * @param {string} from - Sender address. 
 * @param {string} to - Receiver Address. 
 * @param {string} amount - Amount to send. 
 * @param {string} secret - Secret of addr sender. 
 * @param {string} coin - coin type. 
 * @returns {number} - Returns tx.
 * @example -   transferXRP('rNeX8umRDN9qUcYXWW45KDjMBYArf6HkeE','rDTXLQ7ZKZVKz33zJbHjgVShjsBnqMBhmN','100','sh1vxLss2EWamRmiMfr3Nf9tZdSLn','XRP')
 * Should return: Tx Hash and Signed Transaction, example:  Signed Transaction: 12000022800000002400000015201B0071A6FD614000000005F5E10068400000000000000C7321032B638606660A02E58D478EC83BC10F5782690F7578DAAE81CD3306C3190734E974473045022100FF3FCE401732F461E48199A54A850EE9F3E9CEBE6A1308C96073FC14A079930F0220334B98B4B0D5931D281DFE9B3D942305CCF7839E6EAE55F75534C2182797FA21811495B2BAB118494BEB58D91D938F9F90E382C4B62B831488A5A57C829F40F25EA83385BBDE6C3D8B4CA082
                                                            Id of transaction: 4ED279392D37A29D0E198A149E13B2B764C8EBAEA972A737E70A1506C4C8DE58 
 */
    async function transferXRP(from,to,amount,secret,coin){
      await api.connect()
      const payment = {
        "source": {
          "address": from,
          "maxAmount": {
          "value": amount,
          "currency": coin,
          "counterparty": "rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM"
          }
        },
        "destination": {
          "address": to,
          "amount": {
            "value": amount,
            "currency": coin,
            "counterparty": "rMH4UxPrbuMa1spCBR98hLLyNJp4d8p4tM"
          }
        }
      };
      var preparedPayment = await api.preparePayment(from, payment);
      var paymentToSign = await api.sign(preparedPayment.txJSON,secret);
      console.log("Signed Transaction: "+ paymentToSign.signedTransaction)
      console.log("Id of transaction: " + paymentToSign.id)
      var finalMsg = await api.submit(paymentToSign.signedTransaction)
      await api.disconnect()
      return fpaymentToSign.id
    }
  /**
 * Get Address from a seed/secret. If you want testnet coins with Ripple you have to generate your own address in ripple official page.
 * @param {object} seed - Object which include Secret.
 * @returns {object} - Returns Secret, Public Key, Private Key and Address.
 * @example - getAddressXRP({Secret:'ssP5v8S2z9nRDYeqHru1brsc2oEZt'})
 * Should return: { secret: 'ssP5v8S2z9nRDYeqHru1brsc2oEZt',
  privateKey: '0011F942BEE36BA68492FEED324D7BC212CFE57087CA9E0935A13147A540019A6C',
  publicKey: '02DFD8F8E053203E78860F247A2B1A8CCF0FC0DF79881AF2596E051E76F3E8C433',
  address: 'rpfKm7pchZxh3eDKefbZdxXo2p2uQxCK8t' }
 */
  function getAddressXRP(seed){ 
    var keypair = RippleAddr.deriveKeypair(seed.Secret)
    var address = RippleAddr.deriveAddress(keypair.publicKey)
    return {secret: seed.Secret, privateKey: keypair.privateKey, publicKey: keypair.publicKey, address: address}
  }
  module.exports = {
	transferXRP: transferXRP,
	getBalanceXRP: getBalanceXRP,
	getAddressXRP: getAddressXRP,
  }
