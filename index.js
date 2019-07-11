const express = require('express')
const app = express();

// Require Library
const Flutterwave = require('ravepay');
//var router = express.Router();
var Ravepay = require('ravepay');

const bodyParser = require('body-parser');

const inquirer = require('inquirer');

// Include prompt module.
var prompt = require('prompt');

// Authenticate Library with test public_key and test secret_key
//const merchant = new Flutterwave('FLWPUBK_TEST-3179c02d694d9d6edde83ded7cd2afa3-X', 'FLWSECK_TEST-4c50cc0a011cbb965190727184777455-X', false);
var rave = new Ravepay('FLWPUBK_TEST-3179c02d694d9d6edde83ded7cd2afa3-X', 'FLWSECK_TEST-4c50cc0a011cbb965190727184777455-X', false);


// This json object is used to configure what data will be retrieved from command line.
var prompt_attributes = [
    {
        // The fist input text is assigned to username variable.
        name: 'cardno',

    },
    {
        // The second input text is assigned to password variable.
        name: 'cvv',
        // Do not show password when user input.
        hidden: true
    },


    {

        name: 'expirymonth',

        hidden: false
    },

    {

        name: 'expiryyear',

        hidden: false
    },

    {
        // The third input text is assigned to email variable.
        name: 'email',
        // Display email address when user input.
        hidden: false
    },





];

// Start the prompt to read user input.
prompt.start();

// Prompt and get user input then display those data in console.
prompt.get(prompt_attributes, function (err, result) {
    if (err) {
        console.log(err);
        return 1;
    }else {
        console.log('Command-line received data:');

        // Get user input from result object.
        var cardno = result.cardno;
        var email = result.email;
        var cvv = result.cvv;
        var expirymonth = result.expirymonth;
        var expiryyear = result.expiryyear;
      //  var message = "  cardno : " +  cardno , " Email : " + email;

        var message = " cardno : " + cardno + " , email : " + email;

        // Display user input in console log.
        //console.log(message);

        rave.Card.charge(
            {
                "cardno": cardno,
                "cvv": cvv,
                "expirymonth": expirymonth,
                "expiryyear": expiryyear,
                "currency": "NGN",
                "country": "NG",
                "amount": "1000",
                "email": email,
                "phonenumber": "0902620185",
                "firstname": "Swipemax",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-" + Date.now(),// your unique merchant reference
                "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
              }
        ).then(resp => {
            // console.log(resp.body);

            rave.Card.validate({
                "transaction_reference":resp.body.data.flwRef,
                "otp":12345
            }).then(response => {
                console.log(response.body.data.tx);

                console.log("Card charged successfully");

            })

        }).catch(err => {
            console.log(err);

        })
    }
});
