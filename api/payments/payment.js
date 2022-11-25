const router = require("express").Router();
const Razorpay =require("razorpay");
const crypto =require("crypto");
const db = require('../../db/db')
const part = require('../models/participants')

const payments={
    order: async function(req,res){
        try{
            const instance = new Razorpay({
                key_id:process.env.KEY_ID,
                key_secret:process.env.KEY_SECRET,
            });
            const options={
                amount:150000,
                currency:"INR",
                receipt:crypto.randomBytes(10).toString("hex"),
            };

            instance.orders.create(options,(error,order)=>{
                if(error){
                    console.log(error);
                    return res.status(500).json({message:"Something went wrong"});
                }
                else{
                    res.status(200).json({data:order});
                }

            });


        }
        catch (error){
            res.status(500).json({message:"Internal Server Error"});
            console.log(error);

        }
    },
    verify:async function (req,res){
        try {
            const shasum = crypto.createHmac('sha256', secret)
            shasum.update(JSON.stringify(req.body))
            const digest = shasum.digest('hex')

            console.log(digest, req.headers['x-razorpay-signature'])

            if (digest === req.headers['x-razorpay-signature']) {
                console.log('request is legit')
                db.part.update({paymentid:req.body.orderid},
                {
                    $set{paymentstatus:"payed"}
                }
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