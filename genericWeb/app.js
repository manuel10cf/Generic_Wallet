/*
 * Module dependencies
 */

var fs = require('fs');
var r2 = require('r2')
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

//var myLib = require('bitcoinjs-lib');

var app = express()
function MyFunction() {
  alert("myJsFunc");
}
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))

app.use(express.static(__dirname + '/public'))
app.get('/', function (req, res) {
  res.render('index',{title: "MultiApi"})
})

app.get('/getBalance/:addr',async function(req,res){
	let _url = 'https://testnet.blockchain.info/es/rawaddr/'+req.params.addr;
	let request_answer = await r2(_url).text;
    try {
    res.json(JSON.parse(request_answer));
	return balance.final_balance
    } catch (e) {
	return request_answer;
    }
})
app.get('/getUtxos/:of',async function(req,res){
  let _url = 'https://testnet.blockchain.info/es/unspent?active='+req.params.of;
  console.log(_url)
	let request_answer = await r2(_url).text;
    try {
    res.json(JSON.parse(request_answer));
	return balance.final_balance
    } catch (e) {
	return request_answer;
    }
})
app.listen(3001)