// GENERIC
const bigi = require('bigi');
const r2 = require('r2')

// STELLAR
const request = require('request-promise');
const StellarSdk = require('stellar-sdk');

//
//
//             STELLAR TESTNET
//
//

/**
 * Get Balance from an Address.
 * @param {string} addr - Balance of address. 
 * @returns {string} - Returns balance of address in Stellar.
 * @example - getBalanceSTAR("GBFE6BDJA4XHM2YOL34NI2OEOZIKCBR7JTPPNPAQBVLVJCONIK4DORJO")
 * Should return: 10000.0000000, You can check it here: https://www.stellar.org/laboratory/#explorer?resource=accounts&endpoint=single&values=eyJhY2NvdW50X2lkIjoiR0JGRTZCREpBNFhITTJZT0wzNE5JMk9FT1pJS0NCUjdKVFBQTlBBUUJWTFZKQ09OSUs0RE9SSk8ifQ%3D%3D&network=test
 */

async function getBalanceSTAR(addr){
    let _url = 'https://horizon-testnet.stellar.org/accounts/'+addr;
    let request_answer = await r2(_url).text;
    try {
        return JSON.parse(request_answer).balances[0].balance
    } catch (e) {
    return [];
    }
}
/**
 * Get Address from a seed/secret.
 * @param {object} seed - Object which include Secret.
 * @returns {object} - Returns Secret and Public Key.
 * @example - getAddressSTAR({Secret: 'SBNJ55OO6K5G5RRUW75MYMM6HAU3NWEAG6MRSX5RVKWV4HMNNLLZQ7I7'})
 * Should return: { secret: 'SBNJ55OO6K5G5RRUW75MYMM6HAU3NWEAG6MRSX5RVKWV4HMNNLLZQ7I7',
                    publicKey: 'GBFE6BDJA4XHM2YOL34NI2OEOZIKCBR7JTPPNPAQBVLVJCONIK4DORJO' }

 */
function getAddressSTAR(seed){
  var pair = StellarSdk.Keypair.fromSecret(seed.Secret);
	return {secret: pair.secret(),address: pair.publicKey()}
}
  /**
 * Transfer from an Address to another.
 * @param {string} from - Sender address secret. 
 * @param {string} to - Receiver Address Public key. 
 * @param {string} amount - Amount to send. . 
 * @returns {object} - Returns tx.
 * @example -  transferSTAR("SDYSUZKVCEIYHYHYNP4EHIGMLWWHBDSDBXSOCLKDPHYNTFCBPSOMNMRY","GDMVENEZXAAIYGASQ2OZWTDLEFTWQHQ5ZH77J7L5HPHVGWO47DNKMWHZ","100")
 * Should return: Success! Results: { _links: 
   { transaction: 
      { href: 'https://horizon-testnet.stellar.org/transactions/d92740ef064a78a087f35a9081dce383ab0e3d9bddd2ccb82a1f040fa21397bd' } },
  hash: 'd92740ef064a78a087f35a9081dce383ab0e3d9bddd2ccb82a1f040fa21397bd',
  ledger: 7889144,
  envelope_xdr: 'AAAAAGq5DGtDZ5JZyb/SWxlAvg4Itz3mB0G/MKk4aOPiiEbCAAAAZAB4YOQAAAABAAAAAAAAAAEAAAAQVGVzdCBUcmFuc2FjdGlvbgAAAAEAAAAAAAAAAQAAAADZUjSZuACMGBKGnZtMayFnaB4dyf/0/X07z1NZ3PjapgAAAAAAAAAAO5rKAAAAAAAAAAAB4ohGwgAAAECGleCxj/tfPP8HQsSMFRyNhVuS22VviBl8GGpyuIIxloiBTJDDxpkywDS7E0WONkeTi4pjARp474S6HsviD90K',
  result_xdr: 'AAAAAAAAAGQAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAA=',
  result_meta_xdr: 'AAAAAAAAAAEAAAAEAAAAAwB4YPgAAAAAAAAAAGq5DGtDZ5JZyb/SWxlAvg4Itz3mB0G/MKk4aOPiiEbCAAAAF0h255wAeGDkAAAAAQAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAQB4YPgAAAAAAAAAAGq5DGtDZ5JZyb/SWxlAvg4Itz3mB0G/MKk4aOPiiEbCAAAAFwzcHZwAeGDkAAAAAQAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAwB4YPIAAAAAAAAAANlSNJm4AIwYEoadm0xrIWdoHh3J//T9fTvPU1nc+NqmAAAAF0h26AAAeGDyAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAQB4YPgAAAAAAAAAANlSNJm4AIwYEoadm0xrIWdoHh3J//T9fTvPU1nc+NqmAAAAF4QRsgAAeGDyAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAA' }
 */

function transferSTAR(from,to,amount){
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var sourceKeys = StellarSdk.Keypair.fromSecret(from);
var destinationId = to;
var transaction;
server.loadAccount(destinationId)
  // If the account is not found, surface a nicer error message for logging.
  .catch(StellarSdk.NotFoundError, function (error) {
    throw new Error('The destination account does not exist!');
  })
  // If there was no error, load up-to-date information on your account.
  .then(function() {
    return server.loadAccount(sourceKeys.publicKey());
  })
  .then(function(sourceAccount) {
    // Start building the transaction.
    transaction = new StellarSdk.TransactionBuilder(sourceAccount)
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationId,
        // Because Stellar allows transaction in many currencies, you must
        // specify the asset type. The special "native" asset represents Lumens.
        asset: StellarSdk.Asset.native(),
        amount: amount
      }))
      // A memo allows you to add your own metadata to a transaction. It's
      // optional and does not affect how Stellar treats the transaction.
      .addMemo(StellarSdk.Memo.text('Test Transaction'))
      .build();
    // Sign the transaction to prove you are actually the person sending it.
    transaction.sign(sourceKeys);
    // And finally, send it off to Stellar!
    return server.submitTransaction(transaction);
  })
  .then(function(result) {
    console.log('Success! Results:', result);
  })
  .catch(function(error) {
    console.error('Something went wrong!', error);
  });
}

module.exports = {
	transferSTAR: transferSTAR,
	getBalanceSTAR: getBalanceSTAR,
	getAddressSTAR: getAddressSTAR,
  }