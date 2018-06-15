var bitcoin = require('bitcoinjs-lib')
var bip32utils = require('bip32-utils')

var Btc = require('bitcoinjs-lib/src/crypto');
var baddress = require('bitcoinjs-lib/src/address');

var BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
var bs58 = require('base-x')(BASE58)

p0= Btc.sha256(Buffer("0450863AD64A87AE8A2FE83C1AF1A8403CB53F53E486D8511DAD8A04887E5B23522CD470243453A299FA9E77237716103ABC11A1DF38855ED6F2EE187E9C582BA6",'hex'))

console.log(p0.toString('hex'))
p1 = Buffer(p0)
console.log(p1)
p3 = Btc.hash160(p1) // Ripemed 3
console.log(p3) 
p4 = "00" + p3.toString('hex') // Paso 4
console.log(p4)
p5 = Btc.sha256(Btc.sha256(p4).toString('hex')).toString('hex') // Paso 5 y 6

