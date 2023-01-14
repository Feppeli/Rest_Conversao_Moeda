const express = require('express');
const app = express()
const connection = require('./DB/db')

const conversions = require('./DB/models/conversions')

let brl = "brl"
let usd = "usd"
let eur = "eur"
let jpy = "jpy"



// data
var data = new Date();
var dia = String(data.getDate()).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
dataAtual = dia + '/' + mes + '/' + ano;




// CONFIGURAÇÃO DA API

var myHeaders = new Headers();
myHeaders.append("apikey", "ZEqS1d7GsBaHPeQkSWSkPxFTbD2gXmz0");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};



connection.authenticate().then(() => {
    console.log("DB connection established!")
}).catch(err => {
    console.log(err)
})




/* const DB = {
    conversions: [
    {
        "Id": 1,
        "date": "2023-01-14",
        "historical": true,
        "info": {
          "quote": 0.817595,
          "timestamp": 1673720763
        },
        "query": {
          "amount": 8,
          "from": "USD",
          "to": "GBP"
        },
        "result": 6.54076,
        "success": true
    },{
        "date": "2023-01-14",
        "historical": true,
        "info": {
          "quote": 0.817595,
          "timestamp": 1673720763
        },
        "query": {
          "amount": 8,
          "from": "USD",
          "to": "GBP"
        },
        "result": 6.54076,
        "success": true
    }]
} */


app.get('/conversions', (req, res) => {
    res.json(DB.conversions)
    res.sendStatus(200)
})

app.post('/conversion/:userId/:to/:amount/:from', (req, res) => {
    let userId = parseInt(req.params.userId);
    let to = req.params.to;
    let amount = req.params.amount;
    let from = req.params.from;

    if(isNaN(userId)){
        res.sendStatus(400)
    }else{
        fetch(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
            .then(response => response.text())
            .then((result, info, quote) => {
                res.send(result)

                var resultQuote = []
                resultQuote.push(JSON.parse(result))
                console.log(resultQuote)
                console.log(quote)


                conversions.create({
                    userId: userId,
                    to: to,
                    amount: amount,
                    from: from,
                    quote: quote,   // Taxa de conversão bugada
                    date: dataAtual
                })
            })
            .catch(error => console.log('error', error));
            
    }
})


app.listen(4400, () => {
    console.log('API RODANDO')
})
