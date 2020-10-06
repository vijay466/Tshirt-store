const User = require("../models/user");

const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "th3vd3wb367hwwnh",
  publicKey: "99bp46c485fnygcv",
  privateKey: "74c51f33186543e9e7b10aafafaabebe"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({
        
      }, (err, response) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.send(response);
        }
      });
}

exports.processPayment = (req ,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        //deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err) {
              res.status(500).json(err)
          } else {
              res.json(result)
          }
      });
}