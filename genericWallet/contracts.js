/*const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const r2 = require('r2')




// LTCCOIN y DASH
async function get_utxos(){
    let _url = 'https://chain.so/api/v2/get_address_balance/LTCTEST/mtohXGzCNTQziqnoWNcJV2pwYqbVpa4oPo';
    let request_answer = await r2(_url).text;
    
    try {
        console.log(JSON.parse(request_answer).data.confirmed_balance)
    } catch (e) {
//  if (request_answer === "Service Unavailable"){
//      _url = 'testnet.blockexplorer.com/api/addr/' + of + '/utxo';
//      request_answer = await r2(_url).text;
    // }
    return [];
    }
}

// STELLAR BALANCE

async function get_utxos2(){
    let _url = 'https://horizon-testnet.stellar.org/accounts/GDSIFLDFM3E2BKAHXJ7HI7RVWWWIWMP25LGDXSV2S4VX674P6XGGQL6R';
    let request_answer = await r2(_url).text;
    
    try {
        console.log(JSON.parse(request_answer).balances[0].balance)
    } catch (e) {
//  if (request_answer === "Service Unavailable"){
//      _url = 'testnet.blockexplorer.com/api/addr/' + of + '/utxo';
//      request_answer = await r2(_url).text;
    // }
    return [];
    }
}
*/
/*$.post('https://api.blockcypher.com/v1/dash/test3/addrs')
  .then(function(d) {console.log(d)});*/

/*contractInstance.methods.totalSupply.call({from: '0xc8da7d9433f225d8783679fde6c8328ddb285056'}, function(error, result){
    console.log(result)
});*/
// It is a good place for taking docs
// https://www.stellar.org/developers/js-stellar-sdk/reference/examples.html

// Create, sign, and submit a transaction using JS Stellar SDK.

// Assumes that you have the following items:
// 1. Secret key of a funded account to be the source account
// 2. Public key of an existing account as a recipient
//    These two keys can be created and funded by the friendbot at
//    https://www.stellar.org/laboratory/ under the heading "Quick Start: Test Account"
// 3. Access to JS Stellar SDK (https://github.com/stellar/js-stellar-sdk)
//    either through Node.js or in the browser.

// This code can be run in the browser at https://www.stellar.org/laboratory/
// That site exposes a global StellarSdk object you can use.
// To run this code in the Chrome, open the console tab in the DevTools.
// The hotkey to open the DevTools console is Ctrl+Shift+J or (Cmd+Opt+J on Mac).

// To use in node, do `npm install stellar-sdk` and uncomment the following line.
// var StellarSdk = require('stellar-sdk');

// The source account is the account we will be signing and sending from.

// Generar addresses


//SBQIHFQZBMWSB2OLSL5UI23PT7V4TO2HVR5YIXCLXO26FBV2K3LASZWL FROM SECRET
//GC3BLJD2FXE3K2SKELG5TPZFLLVDOMRDROXBZT6NV3BHDQO5BTKDSON3

//SCDBQFLXIBQ3IWDBAEKPM2XCQNBNDTNH7CCANIUMAKN4M4EXNJSKSLEG To SECRET
//GCWPUTCTOUJZYNVFGINTRAXSSLKX5FU4W36WXHAVK42CXAZDM56GHRU4




//10000.0000000

/*
const request = require('request-promise');
const StellarSdk = require('stellar-sdk');
const pair = StellarSdk.Keypair.random();
console.log(pair.secret(), pair.publicKey());
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
console.log(server.loadAccount(pair.publicKey()))*/
/*
request({
  url: 'https://horizon-testnet.stellar.org/friendbot',
  qs: { addr: pair.publicKey() },
  json: true
})
.then(function() {
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  server.loadAccount(pair.publicKey())
    .then(function(account) { console.log(account); });
});
*/


// TRANSACCIONES
/*
var StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var sourceKeys = StellarSdk.Keypair
  .fromSecret('SBQIHFQZBMWSB2OLSL5UI23PT7V4TO2HVR5YIXCLXO26FBV2K3LASZWL');
var destinationId = 'GCWPUTCTOUJZYNVFGINTRAXSSLKX5FU4W36WXHAVK42CXAZDM56GHRU4';
// Transaction will hold a built transaction we can resubmit if the result is unknown.
var transaction;

// First, check to make sure that the destination account exists.
// You could skip this, but if the account does not exist, you will be charged
// the transaction fee when the transaction fails.
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
        amount: "10"
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
    // If the result is unknown (no response body, timeout etc.) we simply resubmit
    // already built transaction:
    // server.submitTransaction(transaction);
  });

*/
/*

<Address: tmGHnje5gyHFJQhecNnxmC6eoP654pusttU, type: pubkeyhash, network: testnet>
<PrivateKey: 46cf1bc1372d50b14c5f24c8104286816b952e4b9c160c5f2fbc68404d4436a7, network: testnet>

<Address: tmYesx38efz3adFbZPQDUMhRC3d75DtLu5G, type: pubkeyhash, network: testnet>
<PrivateKey: cc23cd263f2efdbb8ccea99144b9e95e590b2d1f093ed152bd3e233181d17d48, network: testnet>
*/


// zcash ADDRESSES 
/*

var zbitcore = require('zcash-bitcore-lib')

var privateKey = new zbitcore.PrivateKey('testnet');

var address = privateKey.toAddress();

console.log(address)
//console.log(privateKey)
*/

/*
var privateKey = new bitcore.PrivateKey('L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy');
var utxo = {
  "txId" : "115e8f72f39fad874cfab0deed11a80f24f967a84079fb56ddf53ea02e308986",
  "outputIndex" : 0,
  "address" : "17XBj6iFEsf8kzDMGQk5ghZipxX49VXuaV",
  "script" : "76a91447862fe165e6121af80d5dde1ecb478ed170565b88ac",
  "satoshis" : 50000
};

var transaction = new bitcore.Transaction()
  .from(utxo)
  .to('1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK', 15000)
  .sign(privateKey)
  */


// Last Transactions Mepa https://explorer.zcha.in/api

var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://ropsten.infura.io/YUgGWR2D7ZEwiXgZS9rG"));
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8544")) // If you run your testrpc localy 
//console.log(web3.eth.personal.newAccount("Soy re capo XD"))
//console.log(web3.eth.getBalance("0x1565769a003F1Fe037e47065CB3f553B600339A8"))
//console.log(web3.eth.sendTransaction({from:"0xc8da7d9433f225d8783679fde6c8328ddb285056",to:"0x183Af7f347Df1Ebe80fd6b87edfb01aBC1CBCFB7",value: web3.toWei(0.005),gasPrice: 21000000000}))
var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"supply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"_allowance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]');
var MyContract = web3.eth.contract(abi);
/*var myContractInstance = MyContract.at("0xA121e72415ff9141C510800950150805FA8Ee79F");
var result = myContractInstance.balanceOf("0x7644d4fFA61cD02Aa8bA0a2822c1a987AE1eDc99",{from: "0x7644d4fFA61cD02Aa8bA0a2822c1a987AE1eDc99"});
console.log(result)*/
// ANDA

//MyContract.new({from: account, data: "0x" + bytecode, gasPrice: 4000000000, gas: 2000000})

// transferETH('0x7644d4fFA61cD02Aa8bA0a2822c1a987AE1eDc99','0xA121e72415ff9141C510800950150805FA8Ee79F',0,25000000000,'74dc7b52f81fe992ae7d06b120baa1088746b02378b546c6bde560017435c8e3')
// Transferencia con código a nivel Token.


//IT WORKS.
const util = require('ethereumjs-util')

var privateKey = new Buffer('9f88b9badd15096f13a24e76cedf8ed3a160e0ff3316a47a5dd1e988f37d1990','hex')

console.log(privateKey)

var public = util.privateToPublic(privateKey)

console.log(public)

console.log(util.publicToAddress(public).toString('hex'))
