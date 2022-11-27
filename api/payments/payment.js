const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const db = require("../../db/db");
const part = require("../models/participants");
const nodemailer = require("nodemailer");
const payments = {
  verify: async function (req, res) {
    try {
      console.log(req);

      const shasum = crypto.createHmac("sha256", "secret");
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest("hex");

      console.log(digest, req.headers["x-razorpay-signature"]);

      if (digest === req.headers["x-razorpay-signature"]) {
        console.log("request is legit");

        if (!req.body.payload.payment.entity.captured) {
          return res.status(400).send({
            sucess: false,
            msg: "payment failed",
          });
        }

        if (req.body.payload.payment.entity.amount_paid !== 200) {
          return res.status(400).send({
            sucess: false,
            msg: "payment failed, amount paid is not 150 rs",
          });
        }

        part.findOneAndUpdate(
          { razorpayorderid: req.body.payload.payment.entity.order_id },
          { paymentstatus: "payed" }
        );
        return res.send(200).json({ message: " Not Verified your payment" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server Error!" });
    }
  },
};

module.exports = payments;
