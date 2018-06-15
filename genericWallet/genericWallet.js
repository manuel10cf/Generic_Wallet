// GENERIC
const Web3 = require('web3')
const solc = require("solc")
const bigi = require('bigi');
const r2 = require('r2')
const fs = require('fs');
var generator = require('generate-password');
var sha256 = require('bitcoinjs-lib/src/crypto');
// ETH
const ETH = require("./Ethereum")
// BTC
const BTC = require("./Bitcoin")
// RIPPLE
const XRP = require("./Ripple")
// BCH
const BCH = require("./BitcoinCash")
// STELLAR
const STAR = require("./Stellar")
// LITECOIN
const LTC = require("./Litecoin")
// DASH
const DSH = require("./Dash")
// NEM
const NM = require("./NEM")
// ZCASH
const ZEC = require("./Zcash")
// BIP44
const b44 = require("./Bip44")

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8544")) // If you run your testrpc localy 


class Ethereum{
	balance(address){
		return ETH.getBalanceETH(address)
	}
	transfer(from,to,amount,gasPrice,pvtKey){
		return ETH.transferETH(from,to,amount,gasPrice,pvtKey);
	}
	generateAddress(mnemonic,password){
		return ETH.getAddressETH(mnemonic,password)
	}
	lastTransaction(address){
		return ETH.getLastTransactionsEth(address)
	}
	bip44(num,index,mnemonic){
		b44.bip44("ETH",num,index,mnemonic)
	}
	getAccountFromSeed(seed){
		return ETH.getAddressETH(seed)
	}
}
class Bitcoin{
	balance(address){
		return BTC.getBalanceBTC(address)
	}
	transfer(from,to,amount,gasPrice,pvtKey){
		return BTC.transferBTC(from,to,amount,gasPrice,pvtKey);
	}
	generateAddress(password){
		return BTC.getAddressBTC(password)
	}
	lastTransaction(address){
		return BTC.getLastTransactionsBTC(address)
	}
	getAccountFromSeed(seed){
		console.log(seed)
		return BTC.getAddressBTC(seed)
	}
	bip44(num,index,mnemonic){
		return b44.bip44("BTC",num,index,mnemonic)
	}
}

class Ripple{
	balance(address){
		return XRP.getBalanceXRP(address)
	}
	transfer(from,to,amount,secret,coin){
		return XRP.transferXRP(from,to,amount,secret,coin);
	}
	generateAddress(password){
		return XRP.getAddressXRP(password)
	}
	lastTransaction(address){
	}
	getAccountFromSeed(seed){
		return XRP.getAddressXRP(seed)
	}
	bip44(num,index,mnemonic){
		b44.bip44("XRP",num,index,mnemonic)
	}
}

class BitcoinCASH{
	balance(address){
		return BCH.getBalanceBCH(address)
	}
	transfer(from,to,amount,secret,coin){

	}
	generateAddress(password){
		return BCH.getAddressBCH(password)
	}
	lastTransaction(address){
		return BCH.getLastTransactionsBCH(address)
	}
	getAccountFromSeed(seed){
		return BCH.getAddressBCH(seed)
	}
	bip44(num,index,mnemonic){
		b44.bip44("BTC",num,index,mnemonic)
	}
}

class Litecoin{
	balance(address){
		return LTC.getBalanceLTC(address)
	}
	transfer(from,to,amount,secret,coin){

	}
	generateAddress(password){
		return LTC.getAddressBTC(password)
	}
	lastTransaction(address){
	}
	getAccountFromSeed(seed){
		return LTC.getAddressLTC(seed)
	}
	bip44(num,index,mnemonic){
		b44.bip44("LTC",num,index,mnemonic)
	}
}

class DASH{
	balance(address){
		return DSH.getBalanceDASH(address)
	}
	transfer(from,to,amount,secret,coin){
	}
	generateAddress(password){
	}
	lastTransaction(address){
	}
	bip44(num,index,mnemonic){
		b44.bip44("DASH",num,index,mnemonic)
	}
}

class STELLAR{
	balance(address){
		return STAR.getBalanceSTAR(address)
	}
	transfer(from,to,amount){
		return STAR.transferSTAR(from,to,amount)
	}
	generateAddress(password){
		return STAR.getAddressSTAR()
	}
	lastTransaction(address){

	}
	getAccountFromSeed(seed){
		return STAR.getAddressSTAR(seed)
	}
}

class NEM{
	balance(address){
		return NM.getBalanceNEM(address)
	}
	transfer(from,to,amount){
	}
	generateAddress(password){
		return NM.getAddressNEM()
	}
	lastTransaction(address){

	}
	getAccountFromSeed(seed){
		return NM.getAddressNEM(seed)
	}
}

class ZCASH{
	balance(address){
	}
	transfer(from,to,amount){
	}
	generateAddress(password){
		return ZEC.getAddressZEC()
	}
	lastTransaction(address){

	}
	getAccountFromSeed(seed){
		return ZEC.getAddressZEC(seed)
	}
}
var faucet = {
	'ETH': "http://faucet.ropsten.be:3001/",
	'BTC': "https://testnet.manu.backend.hamburg/faucet",
	'XRP': "https://ripple.com/build/xrp-test-net/",
	'BCH': "https://testnet.manu.backend.hamburg/bitcoin-cash-faucet",
	//'ADA': Cardano,
	'LTC': "http://testnet.thrasher.io/",
	'NEM': "https://tomotomo9696.xyz/nem/faucet/",
	//'NEO': NEO,
	'STAR': "https://www.stellar.org/laboratory/#account-creator?network=test",
	//'IOTA': IOTA,
	'DASH': "http://test.faucet.masternode.io/",
	//'XMR': Monero,
	//'BTG': BitcoinGold,
	//'ETC': EthereumCLA,
	//'LSK': Lisk,
	//'NANO': Nano,
	'ZEC': "https://faucet.testnet.z.cash/",
	//'USDT': Tether,
	//'XVG': Verge,
	//'SC': Siacoin,
}

//
//
//             TOKENS TESTNET
//
//

// ERC20 abi
var abi = JSON.parse('[{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"supply","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"ok","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"_allowance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]');
var ti_contract = web3.eth.contract(abi);
//
//
//             EOS TESTNET
//
//
var contractEOS = ti_contract.at("0xA121e72415ff9141C510800950150805FA8Ee79F");
//
//
//             TRON TESTNET
//
//
var contractTRON = ti_contract.at("0x2d6dEeCCF004A51459D84E476C709118E53B9b87");
//
//
//             OMISEGO TESTNET
//
//
var contractOMG = ti_contract.at("0x5b28ADE16001219Ad2852C760D77B0D7f02Aa415");
//
//
//             VECHAIN TESTNET
//
//
var contractVEC = ti_contract.at("0x185C466C9079C9a0426C34d95EE5672C9F8Fd84C");
//
//
//             QTUM TESTNET
//
//
var contractQTUM = ti_contract.at("0xaa338c4a23174D59564cb750a0CCcD8A4BF6aDe8");
//
//
//             BENANCE TESTNET
//
//
var contractBNC = ti_contract.at("0x183Af7f347Df1Ebe80fd6b87edfb01aBC1CBCFB7");
//
//
//             POPULOUS TESTNET
//
//
var contractPOP = ti_contract.at("0x1E761C2f26528c5777C08aB9c3DD110b1cA8c0B1");
class ERC20{
	constructor(adr,address){
		this.object = adr
		this.address= address
	}
	totalSupply(){
		return this.object.totalSupply()
	}
	balance(addr){
		return this.object.balanceOf(addr,{from: this.address})
	}
	transfer(to,amount){
		return this.object.transfer(to,amount,{from: this.address})
	}
	approve(spender,value){
		return this.object.approve(spender,value,{from: this.address})
	}
	allowance(to,value){
		return this.object.allowance(to,value,{from: this.address})
	}
}
//
//
//             WALLET CLASS
//
//
var cryptoassets = {
	'ETH': Ethereum,
	'BTC': Bitcoin,
	'EOS': ERC20,
	'TRON': ERC20,
	//'ICON': ERC20(contract),
	'OMG': ERC20,
	'VEC': ERC20,
	'QTUM': ERC20,
	'BNC': ERC20,
	'POP': ERC20,
	'XRP': Ripple,
	'BCH': BitcoinCASH,
	//'ADA': Cardano,
	'LTC': Litecoin,
	'NEM': NEM,
	//'NEO': NEO,
	'STAR': STELLAR,
	//'IOTA': IOTA,
	'DASH': DASH,
	//'XMR': Monero,
	//'BTG': BitcoinGold,
	//'ETC': EthereumCLA,
	//'LSK': Lisk,
	//'NANO': Nano,
	'ZEC': ZCASH,
	//'USDT': Tether,
	//'XVG': Verge,
	//'SC': Siacoin,
}
var tokenContracts = {
	'EOS': contractEOS,
	'TRON': contractTRON,
	//'ICON': contractICON,
	'OMG': contractOMG,
	'VEC': contractVEC,
	'QTUM': contractQTUM,
	'BNC': contractBNC,
	'POP': contractPOP,
}
class Wallet {
	constructor(coin,options){
		this.privateKey = options.privateKey
		this.coin = coin;
		//this.object = new cryptoassets[coin](tokenContracts[coin],address);
		this.object = new cryptoassets[coin]
		/*if (options.PrivateKey === undefined || options.PrivateKey === null) {
			options.PrivateKey = sha256.sha256(options.password).toString('hex')
		}*/
		this.account = this.object.getAccountFromSeed(options)
		this.address= this.account.address
	}
	getBalance(address){
		console.log(this.address)
		if (address === undefined) {
			address = this.address;
		}
		return this.object.balance(address)	
	}
	transfer(var1,var2,var3,var4,var5){
		return this.object.transfer(var1,var2,var3,var4,var5)
	}
	getAddressRandom(pass){
		return this.object.getAccountFromSeed({PrivateKey: sha256.sha256(pass).toString('hex')})
	}
	getTotalSupply(){
		return this.object.totalSupply()
	}
	allowenceToken(token,to,value){
		return this.object.allowance(owner,spender);
	}
	approveToken(token,spender,value){
		return this.object.approve(spender,value);
	}
	getBip44(num,index,mnemonic){
		return this.object.bip44(num,index,mnemonic);
	}
}

var options = {
	//mnemonic: 'assdfjasddnasasd daasasasdaddasasd sjdfbnsd fnsdj fsdkio fjsido nfhjidso oisdjhf sodijf sodfij sdoifj sdpifj',
	//password: "23adsaaasdsdassdsadsa",
	//PrivateKey: "51593731417393989063100715043982327130617014464744174480514247935560226892240",
	//Secret:"shpqKDLf83a2pRbKxSuoPVMjxCyiE",
	Secret: "SBNJ55OO6K5G5RRUW75MYMM6HAU3NWEAG6MRSX5RVKWV4HMNNLLZQ7I7",
}

var wallet1 = new Wallet("STAR",options)
//b44.bip44("BTC",5,0,"dad minute exhibit slot ball vault fever busy awkward cook gloom already")
//console.log(wallet1.getBip44(15,0,"dad minute exhibit slot ball vault fever busy awkward cook gloom already"))
wallet1.getBalance().then(function(d){
	console.log(d)
})
