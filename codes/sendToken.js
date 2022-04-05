var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var arguments = process.argv.slice(2);

if(!arguments || arguments.length!=2){
	console.log("Parameter length must be 2");
	return;
}

var _from = web3.eth.accounts[0];
var _to = arguments[0];
var amount = arguments[1];

var abi = [{"constant":true,"inputs":[],"name":"minter","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"send","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Sent","type":"event"}];
var CoinContract = web3.eth.contract(abi);
var contractAddress = "";
var contractInstance = CoinContract.at(contractAddress);

web3.personal.unlockAccount(_from, '123456', (err,res)=>{
	if(err)
		console.log("Error: ", err);
	else {
		contractInstance.send(_to, amount, {from: _from}, (err, res)=>{
			if(err)
				console.log("Error: ", err);
			else
				console.log("Result: ", res);
		});
	}
});