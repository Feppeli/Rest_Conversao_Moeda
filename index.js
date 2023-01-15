const express = require('express');
const app = express()
const connection = require('./DB/db')
const conversions = require('./DB/models/conversions')


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



app.get('/conversions', (req, res) => {    
    conversions.findAll().then(conversions => {
        res.send(conversions)
    })
    
})

app.post('/conversion/:userId/:to/:amount/:from', (req, res) => {
    let userId = parseInt(req.params.userId);
    let to = req.params.to;
    let amount = req.params.amount;
    let from = req.params.from;

    if(isNaN(userId)){
        res.sendStatus(400)
        res.send('userId must be a number')
    }
    if(isNaN(amount)){
        res.sendStatus(400)
        res.send('Amount must be a number')
    }
    else{
        fetch(`https://api.apilayer.com/currency_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
            .then(response => response.text())
            .then((result) => {
                res.send(result)

                var resultQuote = []
                resultQuote.push(JSON.parse(result))
                console.log(resultQuote[0].info.quote)


                conversions.create({
                    userId: userId,
                    to: to,
                    amount: amount,
                    from: from,
                    quote: resultQuote[0].info.quote,   // Taxa de conversão bugada
                    date: dataAtual
                })
            })
            .catch(error => {
                res.send(error)
            });
    }
    
})


app.listen(4400, () => {
    console.log('API RODANDO')
})
