const Web3 = require("web3");
const fs = require('fs');
const solc = require('solc');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8544"));
// const web3 = new Web3(new Web3.providers.IpcProvider(config.ipc_file, net));

const input = fs.readFileSync('ICON.sol'); // Here you have to put your contract.sol i.e. EOS.sol
const output = solc.compile(input.toString(), 1);
//console.log(output)


//var bytecode = output.contracts[':IcxToken'].bytecode;

//var abi = JSON.parse(output.contracts[':IcxToken'].interface)

var abi = JSON.parse('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_amount","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"seal","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_bonus","type":"uint256"}],"name":"offerBonus","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isSealed","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"lastMintedTimestamp","outputs":[{"name":"","type":"uint32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_isRaw","type":"bool"},{"name":"timestamp","type":"uint32"}],"name":"mint","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]')
var bytecode = ''
const account = "0xc8da7d9433f225d8783679fde6c8328ddb285056";
var ti_contract = web3.eth.contract(abi);
var contractInstance = ti_contract.at('0x185C466C9079C9a0426C34d95EE5672C9F8Fd84C');
var a = contractInstance.totalSupply({from: "0xc8da7d9433f225d8783679fde6c8328ddb285056"})
//console.log(a)
ti_contract.new({from: account, data: "0x" + bytecode, gasPrice: 4000000000, gas: 2000000})

//0x7644d4fFA61cD02Aa8bA0a2822c1a987AE1eDc99

/*
EOS 0xA121e72415ff9141C510800950150805FA8Ee79F      VOY A SETEAR SI SE PUEDE POR MINT 1000 LISTO
TRON 0x2d6dEeCCF004A51459D84E476C709118E53B9b87                                       2000 LISTO
QTUM 0xaa338c4a23174D59564cb750a0CCcD8A4BF6aDe8                                       ...  LISTO
VEC 0x185C466C9079C9a0426C34d95EE5672C9F8Fd84C
BNB 0x183Af7f347Df1Ebe80fd6b87edfb01aBC1CBCFB7                                             LISTO
OMG 0x5b28ADE16001219Ad2852C760D77B0D7f02Aa415                                             LISTO
POP 0x1E761C2f26528c5777C08aB9c3DD110b1cA8c0B1                                        7000 LISTO
*/


/*
var generator = require('generate-password');
 
var password = generator.generate({
    length: 20,
    numbers: true
});
console.log(password)*/



const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// Connect to local Ethereum node
let web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
//let net = require('net');
//let web3 = new Web3(new Web3.providers.IpcProvider('/home/alejoamiras/blockchain/Node1/geth.ipc', net));
//var TestRPC = require("ethereumjs-testrpc");
//web3.setProvider(TestRPC.provider());

// Compile the source code
const input = fs.readFileSync('AdvancedTokenScratch.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':AdvancedTokenScratch'].bytecode;
const abi = JSON.parse(output.contracts[':AdvancedTokenScratch'].interface);

let _contract;
let _deployedContract;
let _myAddress;
const _destAddress = "0x5c3453c5189eda3adde88bf56b866644673c0f9a";
const password = "pepe";

web3.eth.getCoinbase().then(myAddress => {
    console.log("[INFO] Address", myAddress);
    _myAddress = myAddress
    _contract = new web3.eth.Contract(abi, {
        from: myAddress,
        gas: 200000*2,
    }).deploy({
        data: '0x' + bytecode
    });
    _contract.estimateGas().then( gas => {
        console.log("[INFO] Gas estimate for deploying contract:",gas);
    });
    //web3.eth.personal.unlockAccount(myAddress, password).then(res => {
        console.log("[INFO] Account unlocked correctly");
        _contract.send()
        .on('confirmation', (confirmationNumber, receipt) =>{
            console.log('[INFO] Confirmation:', confirmationNumber);
        })
        .on('receipt', receipt => {
            console.log('[INFO] Contract address:', receipt.contractAddress);
            _deployedContract = new web3.eth.Contract(abi, receipt.contractAddress);
            startWatchingForEvents();
            sendTransaction();
        })
        .on('error', console.error);
    //}).catch((err) =>{
         console.log("[ERROR] While trying to unlock the account", err)
    //});
}).catch(() =>{
     console.log("[ERROR] While trying to get address")
 });

function startWatchingForEvents() {
    _deployedContract.events.Transfer({}, (error, event) =>  {
        if(error){ console.error(error); return; }
        console.log("[Event] Transfer of", event.returnValues.amount,"from", event.returnValues.from, "to", event.returnValues.to);
    });
}

function sendTransaction() {
    transfer(_myAddress, _destAddress, 10).then(() => {
        getBalance(_destAddress).then(balance => {
            console.log("[INFO] New balance of partner:", balance)
            setTimeout(sendTransaction, 3000);
        });
    });
}

function getBalance(ofAddress) {
    return _deployedContract.methods.balances(ofAddress).call({
        from: _myAddress
    });
}

function transfer(fromAddress, toAddress, amountOfTokens) {
    console.log("[INFO] Making a transfer of", amountOfTokens,"tokens from", fromAddress, "to", toAddress, "...");
    return _deployedContract.methods.transfer(toAddress, amountOfTokens).send({
        from: fromAddress
    });
}