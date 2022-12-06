const part = require("../models/participants");
const { model } = require("mongoose");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require("../../db/db");
const { update } = require("../models/participants");
const { response } = require("express");
require("dotenv").config();
const Part = {
  save: async function (req, res) {
    try {
      const { name, mailid, phno, institute, question } = req.body;
      console.log(req.body);

      if (!name || !mailid || !phno || !institute || !question)
        return res.status(400).send({
          sucess: false,
          msg: "enter all fields",
        });

      const dup = await part.findOne({
        phno,
      });

      if (dup) {
        if (dup.paymentstatus == "pending")
          return res.status(200).json({ data: dup, duplicate: true });

        return res.status(400).send({
          success: false,
          msg: "already registered",
        });
      }

      // newpart.save((err, newpart) => {
      //     if (!err) {
      //             try{
      //                 const instance = new Razorpay({

      //                 key_id:process.env.KEY_ID,
      //                 key_secret:process.env.KEY_SECRET
      //                 });
      //                 const options = {
      //                 amount: 200,
      //                 currency: "INR",
      //                 receipt: crypto.randomBytes(10).toString("hex"),
      //                 };

      //                 instance.orders.create(options, (error, order) => {
      //                 if (error) {
      //                     console.log(error);
      //                     return res
      //                     .status(500)
      //                     .json({ message: "Something went wrong" });
      //                 } else
      //                 {
      //                         console.log(order);
      //                         part.findByIdAndUpdate({_id:newpart._id},

      //                             {razorpayorderid:order.id},
      //                             {new:true}
      //                             ).then((data)=>{
      //                                 console.log(data);
      //                                 const response = {
      //                                     _id:data._id,
      //                                     name:data.name,
      //                                     mailid:data.mailid,
      //                                     phno:data.phno,
      //                                     paymentstatus:data.paymentstatus,
      //                                     razorpayorderid:data.razorpayorderid,
      //                                     part_id:data.part_id
      //                                 }
      //                                // res.json({ order, message: "Paymentid clear" });
      //                                res.status(200).send({
      //                                 sucess:true,
      //                                 data:response
      //                                })
      //                             });

      //                                 }
      //                 });

      //             }
      //                 catch(err){
      //                     console.log(err)
      //             }

      //     } else {
      //         console.log(err)
      //         res.send(400).send({
      //             sucess: false,
      //             err
      //         })
      //     }
      // })

      const instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
      });
      const options = {
        amount: 150000,
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };
      const order = await instance.orders.create(options);
      console.log(order);
      const newpart = part({
        name: name,
        mailid: mailid,
        phno: phno,
        institute: institute,
        question: question,
        paymentstatus: "pending",
        razorpayorderid: order.id,
      });

      const newpart_ = await newpart.save();
      if (!newpart_)
        return res.status(400).send({
          sucess: false,
          msg: "error in saving",
        });
      // res.json({ order, message: "Paymentid clear" });
      return res.status(200).send({
        sucess: true,
        data: newpart_,
      });
    } catch (err) {
      console.log(err);

      return res.send(400).send({
        sucess: false,
        err,
      });
    }
  },

  id: async function (req, res) {
    // console.log(req.params);
    part.find(
      {
        part_id: req.params.id,
      },
      (err, arrdata) => {
        if (err) {
          return res.status(400).send({
            sucess: false,
          });
        } else {
          return res.status(200).send({
            success: true,
            data: { ...arrdata, razorpayorderid: undefined },
          });
        }
      }
    );
  },
  detail: async function (req, res) {
    var pass = req.params.pass;
    console.log(pass);

    if (pass == "abcd$1256") {
      part.find({}, function (err, users) {
        var userslist = {};

        users.forEach(function (user) {
          userslist[user._id] = user;
        });
        return res.status(200).send({
          sucess: true,
          data: userslist,
        });
      });
    } else {
      return res.status(200).send({
        sucess: false,
        data: "Not Authenticated",
      });
    }
  },
};

module.exports = Part;
