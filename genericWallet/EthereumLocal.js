//
//
//             ETHEREUM LOCAL TESTNET
//
//

// Balance (address)
var getBalanceLETH = (acct) => {return console.log(web3.fromWei(web3.eth.getBalance(acct),'ether').toNumber()) }

// Example for getBalanceLETH:
// getBalanceLETH('0xb0A06365E03211856B62A28c2f587009674E67bd')

// Transfer (address,address,int,int)
var transferLETH = (from,to,amount,gasPrice,data) => {return console.log(web3.eth.sendTransaction({from: from, to: to, value: web3.toWei(amount, 'ether'), gasLimit: 21000, gasPrice: gasPrice,data:data})) }

// Example for transferLETH:
// transferLETH('0xb0A06365E03211856B62A28c2f587009674E67bd','0x7644d4fFA61cD02Aa8bA0a2822c1a987AE1eDc99',1,30000000000) // addresses in testrpc

// Generate address by a password. (string)
var addressByPasswordLETH = (pass) => {return '0x'+EthUtil.privateToAddress(web3.sha3(pass)).toString('hex')}

// Example for addressByPasswordLETH:
// addressByPasswordLETH('1234')

// Generate key with password. (string)
var keyByPasswordLETH = (pass) => {return web3.sha3(pass)}

// Example for keyByPasswordLETH:
// keyByPasswordLETH('1234')

// Generate Address with a key. (key)
var addressByKeyLETH = (key) => {return '0x'+ EthUtil.privateToAddress(key).toString('hex')}

// Example for addressByKeyLETH: 
// addressByKeyLETH('280f9c13e38f7bd67bcd0ca24095f0de9c746b73ebc7aab901c9adb81a316563')

// Smart Contracts (contractCode(string),int(gas))
function smartContractGenerateLETH(source,gas,gasLimit,from){

	var output = solc.compile(source, 1)
	for (var contractName in output.contracts) {
    var abi = JSON.parse(output.contracts[contractName].interface)
	var helloWorldContract = web3.eth.contract(abi)
	const deployed = helloWorldContract.new({
		from: from,
		data: output.contracts[contractName].bytecode,
		gas: gas,
		gasLimit: gasLimit,
		gasPrice: 5 // It works.
		}, (error, contract) => {
    		if (error){
      			console.error(error);
    		} else {
    			console.log(contract)
    			}
			})		
		}
}
//smartContractGenerateLETH(input,5000000)
