const router = require("express").Router();
const Razorpay =require("razorpay");
const crypto =require("crypto");
const db = require('../../db/db')
const part = require('../models/participants')
const nodemailer = require('nodemailer');
const payments={
   
    verify:async function (req,res){
        try {
            const shasum = crypto.createHmac('sha256', "secret")
            shasum.update(JSON.stringify(req.body))
            const digest = shasum.digest('hex')

            console.log(digest, req.headers['x-razorpay-signature'])

            if (digest === req.headers['x-razorpay-signature']) {
                console.log('request is legit')
                part.findOneAndUpdate({razorpayorderid:req.body.orderid},
                {paymentstatus:"payed"}
                
                )
                res.send(200).json({message:"Verified your payment"});

            } else {
                // pass it
                res.send(200).json({message:" Not Verified your payment"});

            }


        }
        catch (error){
            res.status(500).json({message:"Internal server Error!"});
            console.log(error);

        }
    }
}

module.exports=payments;