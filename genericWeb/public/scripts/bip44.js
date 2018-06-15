
var bip39 = require("bip39");
const bip32 = require("ripple-bip32");
const RippleAddr=require("ripple-keypairs")
var net = {
    bitcoin: {
        messagePrefix: '\x18Bitcoin Signed Message:\n',
        bech32: 'bc',
        bip32: {
          public: 0x0488b21e,
          private: 0x0488ade4
        },
        pubKeyHash: 0x00,
        scriptHash: 0x05,
        wif: 0x80
      },
      testnet: {
        messagePrefix: '\x19Litecoin Signed Message:\n',
        bech32: 'tb',
        bip32: {
          public: 0x043587cf,
          private: 0x04358394
        },
        pubKeyHash: 0x6f,
        scriptHash: 0x6f,
        wif: 0xef
      },
      litecoin: {
        messagePrefix: '\x19Litecoin Signed Message:\n',
        bip32: {
          public: 0x019da462,
          private: 0x019d9cfe
        },
        pubKeyHash: 0x30,
        scriptHash: 0x32,
        wif: 0xb0
      },
      dashtn: {
        messagePrefix: '\x19Litecoin Signed Message:\n',
        bech32: 'tb',
        bip32: {
          public: 0x043587cf,
          private: 0x04358394
        },
        pubKeyHash: 0x8c,
        scriptHash: 0xc4,
        wif: 0xef
      },
      bgold: {
        messagePrefix: '\x19Litecoin Signed Message:\n',
        bech32: 'tb',
        bip32: {
          public: 0x043587cf,
          private: 0x04358394
        },
        pubKeyHash: 38,
        scriptHash: 0xc4,
        wif: 0xef
      },
      dash: {
        messagePrefix: '\x19Litecoin Signed Message:\n',
        bech32: 'tb',
        bip32: {
          public: 0x043587cf,
          private: 0x04358394
        },
        pubKeyHash: 0x4c,
        scriptHash: 0xc4,
        wif: 0xef
      },
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
var wallet = ""


function bip44 (coin,num,index,seed){
  let hdwallet = hdkey.fromMasterSeed(seed);
  let wallet_hdpath = "m/44'/" + coinType(coin) +"/0'/0";
  let wallets = {};
  let pubKey = ""
  let privKey = ""
  let addresses = ""
  for (let i = index; i < index + num; i++){

    wallet = hdwallet.derivePath(wallet_hdpath + i).getWallet();
    var addr = getAddress({privateKey: wallet._privKey.toString('hex'), publicKey: hdwallet.derivePath(wallet_hdpath + i)._hdkey.publicKey.toString('hex') },coin).address;
    //addresses.push({address: addr, PrivateKey: wallet._privKey.toString('hex'), PublicKey: hdwallet.derivePath(wallet_hdpath + i)._hdkey.publicKey.toString('hex')});
    addresses=addr+"\n"+addresses
    pubKey=hdwallet.derivePath(wallet_hdpath + i)._hdkey.publicKey.toString('hex')+"\n"+pubKey 
    privKey= wallet._privKey.toString('hex')+"\n"  + privKey 
    wallets[addr] = wallet;
  }

  return {addresses:addresses,hdpath: wallet_hdpath,privKey:privKey,pubKey:pubKey}
}
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
      return {address:"0x" + wallet.getAddress().toString('hex')}
    break;
    case "XRP":
      return {address:RippleAddr.deriveAddress(keyPair.publicKey) }
    break;
  }
}
