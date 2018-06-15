//var nem = require('nem-sdk').default

// Derive a passphrase to get a private key
// A funny but valid private key
/*var privateKey = "aaaaaaaaaaeeeeeeeeeebbbbbbbbbb5555555555dddddddddd1111111111aaee";

// Create a key pair
var keyPair = nem.crypto.keyPair.create(privateKey);

console.log(keyPair.publicKey.toString())

var address = nem.model.address.toAddress(keyPair.publicKey.toString(), -104)

console.log(address)

var isFromNetwork = nem.model.address.isFromNetwork(address, -104);
console.log(isFromNetwork)*/
/*097f1b4aeb308a1969f038fe2c986325e437138d6ce02cccfa15f706ada959f3
TDZYI3GYNXMO7HPHJMFXIG3YQFVINZJKHGQPEWWE*/

/*99 XEM を TDZYI3GYNXMO7HPHJMFXIG3YQFVINZJKHGQPEWWE に送りました。
TxID :
37397e35833680f9af23ae56bb623a54813846365f7225b0fd62bc19a4633f9d
*/

// BALANCE NEM/*
/*var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

nem.com.requests.account.data(endpoint, 'TB37VH34IMRDSOSRHQ5QEGJVRQKQBBANDAFT76O3').then(function(res) {
	console.log("\nAccount data:");
	console.log(res);
}, function(err) {
	console.error(err);
});
/*
nem.com.requests.account.transactions.all(endpoint, 'TB37VH34IMRDSOSRHQ5QEGJVRQKQBBANDAFT76O3').then(function(res) {
	console.log("\nAll transactions of the account:");
	console.log(res);
}, function(err) {
	console.error(err);
});
*/
/*
var privateKey = nem.crypto.helpers.derivePassSha("passphrase",2).priv;
var keyPair = nem.crypto.keyPair.create(privateKey);
var address = nem.model.address.toAddress(keyPair.publicKey.toString(), -104)*/
//TB37VH34IMRDSOSRHQ5QEGJVRQKQBBANDAFT76O3
//var common = nem.model.objects.create("common")("passphrase","1fdedc6e081a89e4dc3b5f6a3cb4d5f51249e5c8141306af837deafd660f36e0");


// Create an object with parameters
//var transferTransaction = nem.model.objects.create("transferTransaction")("TDZYI3GYNXMO7HPHJMFXIG3YQFVINZJKHGQPEWWE", 10, "Hello");

// Prepare the above object
//var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.testnet.id)

//console.log(transactionEntity)

//var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);


// Create an object with parameters (multisig account address and inner transaction hash)
/*var signatureTransaction = nem.model.objects.create("signatureTransaction")("TDZYI3GYNXMO7HPHJMFXIG3YQFVINZJKHGQPEWWE", "bd5eb8fbc4099278e37b4e3e2c5c02e2baa222b2bd95476d684c5cef46ea8beb");

// Prepare the above object
var transactionEntity = nem.model.transactions.prepare("signatureTransaction")(common, signatureTransaction, nem.model.network.data.testnet.id)

console.log(transactionEntity.otherHash.data)

//nem.model.transactions.send(common, transactionEntity, endpoint).then(function(res) {console.log(res)});


// Create an object with parameters (multisig account address and inner transaction hash)
var signatureTransaction = nem.model.objects.create("signatureTransaction")("TDZYI3GYNXMO7HPHJMFXIG3YQFVINZJKHGQPEWWE", transactionEntity.otherHash.data);

// Prepare the above object
var transactionEntity2 = nem.model.transactions.prepare("signatureTransaction")(common, signatureTransaction, nem.model.network.data.testnet.id)

//console.log(transactionEntity2)

nem.model.transactions.send(common, transactionEntity2, endpoint).then(function(res) {console.log(res)});

*/
// Create an NIS endpoint object
/*var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

// Create a common object holding key
var common = nem.model.objects.create("common")("passphrase", privateKey);

// Create an un-prepared transfer transaction object
var transferTransaction = nem.model.objects.create("transferTransaction")("TB37VH34IMRDSOSRHQ5QEGJVRQKQBBANDAFT76O3", 10, "Hello");


// Prepare the transfer transaction object
var transactionEntity = nem.model.transactions.prepare("transferTransaction")(common, transferTransaction, nem.model.network.data.testnet.id);
console.log(transactionEntity)
// Serialize transfer transaction and announce
nem.model.transactions.send(common, transactionEntity, endpoint)
*/
var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var bs58 = require('base-x')(BASE58)

console.log(bs58.encode("40682667496632180328046523709375904054863421861648184755722103793015813725512").slice(2,66))