const part=require('../models/participants')
const {model} =require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require("../../db/db");
const { update, findById } = require('../models/participants');
const Part = {

    save: async function (req, res) {
        const {
            name,
            mailid,
            phno
        } = req.body

        if ((!name)|| (!mailid) || (!phno)) {
            res.status(400).send({
                sucess: false,
                msg: 'enter all feilds'
            })
        }
       


        const newpart = part({
            name: name,
            mailid: mailid,
            phno: phno,
            paymentstatus:"pending",
            paymentid:"not available"

        })
        newpart.save((err, newpart) => {
            if (!err) {
                try{
                const instance = new Razorpay({
                  key_id: "rzp_test_XZNzsAR8fi6ciu",
                  key_secret: "HHWDX8iBrOmFgsfXGGtrYZfV"
                });
                const options = {
                  amount: 150000,
                  currency: "INR",
                  receipt: crypto.randomBytes(10).toString("hex"),
                };

                instance.orders.create(options, (error, order) => {
                  if (error) {
                    console.log(error);
                    return res
                      .status(500)
                      .json({ message: "Something went wrong" });
                  } else 
                  {
                        console.log(order);
                        part.findByIdAndUpdate({_id:newpart._id},
                            
                            {paymentid:order.id},
                            {new:true}
                            ).then((data)=>{
                                console.log(data);
                                res.json({ order, message: "Paymentid created" });
                            });

                   
 }
                });


                }
                catch(err){
                    console.log(err)
                }
                response=part.findById(newpart._id);
                res.status(200).send({
                    success: true,
                    data: response
                })
            } else {
                console.log(err)
                res.send(400).send({
                    sucess: false,
                    err
                })
            }
        })
         try {
           
         } catch (error) {
           res.status(500).json({ message: "Internal Server Error" });
           console.log(error);
         }
    },

    id: async function (req, res) {
        // console.log(req.params);
        part.findById(
            {
                _id: req.params.id,
            },
            (err, arrdata) => {
                if (err) {
                    res.status(400).send({
                        sucess: false,
                    });
                } else {
                    res.status(200).send({
                        sucess: true,
                        data:arrdata,
                    });
                }
            }
        );
    },
    detail: async function (req,res){
        var pass =req.params.pass;
        console.log(pass);

        if(pass=="abcd$1256"){
            part.find({},function (err,users){
                var userslist={};

                users.forEach(function (user){
                    userslist[user._id]=user;
                })
                res.status(200).send({
                    sucess:true,
                    data:userslist
                })
            })


        }
        else{
            res.status(200).send({
                sucess:false,
                data:"Not Authenticated"
            })
        }
    }
}

module.exports = Part
