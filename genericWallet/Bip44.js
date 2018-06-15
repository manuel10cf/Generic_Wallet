
var bip39 = require("bip39");
var hdkey = require('ethereumjs-wallet/hdkey');
const bigi = require('bigi');
const r2 = require('r2')
const btcjs = require('bitcoinjs-lib');
const net = require("./networks")
const bip32 = require("ripple-bip32");
const RippleAddr=require("ripple-keypairs")

const mnemonicR = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeed(mnemonicR)
const m = bip32.fromSeedBuffer(seed)

function getAddress(keyPair,coin){
  var pvtKey = bigi.fromDERInteger(keyPair.privateKey)
  switch(coin){
    case 'BTC':
      key_pair = new btcjs.ECPair(pvtKey, null,{network: net.bitcoin});
      return {address: key_pair.getAddress()}
    break;
    case 'TEST':
      key_pair = new btcjs.ECPair(pvtKey, null,{network: net.testnet});
      return {address: key_pair.getAddress()}
    break;
    case 'LTC':
      key_pair = new btcjs.ECPair(pvtKey, null,{network: net.litecoin});
      return {address: key_pair.getAddress()}
    break;
    case 'DASHTEST':
      key_pair = new btcjs.ECPair(pvtKey, null,{network: net.dashtn});
      return {address: key_pair.getAddress()}
    break;
    case "BTG":
      key_pair = new btcjs.ECPair(pvtKey, null,{network: net.bgold});
      return {address: key_pair.getAddress()}
    break;
    case "DASH":
      key_pair = new btcjs.ECPair(pvtKey, null,{network: net.dash});
      return {address: key_pair.getAddress()}
    break;
    case "ETH":
      return "0x" + wallet.getAddress().toString('hex')
    break;
    case "XRP":
      return {address:RippleAddr.deriveAddress(keyPair.publicKey) }
    break;
  }
}
function coinType(coin){
  switch(coin){
    case 'BTC':
      return "0"
    break;
    case 'TEST':
      return "1"
    break;
    case 'LTC':
      return "2"
    break;
    case 'DASHTEST':
      return "1"
    break;
    case "BTG":
      return "57"
    break;
    case "DASH":
      return "156"
    break;
    case "ETH":
      return "60"
    break;
    case "XRP":
      return "144"
    break;
  }
}
function bip44 (coin,num,index,mnemonic){
  let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
  let wallet_hdpath = 'm/44"/' + coinType(coin) +'/0"/0';
  let wallets = {};
  let addresses = [];
  for (let i = index; i < index + num; i++){

    var wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
    var addr = getAddress({privateKey: wallet._privKey.toString('hex'), publicKey: hdwallet.derivePath(wallet_hdpath + i)._hdkey.publicKey.toString('hex') },coin);
    addresses.push({address: addr, PrivateKey: wallet._privKey.toString('hex'), PublicKey: hdwallet.derivePath(wallet_hdpath + i)._hdkey.publicKey.toString('hex')});
    wallets[addr] = wallet;
  }
  return {addresses:addresses,hdpath: wallet_hdpath}
}
//bip44("BTC",5,0,"dad minute exhibit slot ball vault fever busy awkward cook gloom already")
module.exports = {
  bip44: bip44,
}
