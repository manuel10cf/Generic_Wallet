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