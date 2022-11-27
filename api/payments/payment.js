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

      if (digest !== req.headers["x-razorpay-signature"]) {
        return res.status(200).json({ msg: "Transaction not legit!" });
      }

      console.log("request is legit");

      if (!req.body.payload.payment.entity.captured) {
        await part.findOneAndUpdate(
          { razorpayorderid: req.body.payload.payment.entity.order_id },
          { paymentstatus: "failed" }
        );

        return res.status(200).json({});
      }

      if (req.body.payload.payment.entity.amount_paid !== 200) {
        await part.findOneAndUpdate(
          { razorpayorderid: req.body.payload.payment.entity.order_id },
          { paymentstatus: "failed" }
        );

        return res.status(200).send({
          sucess: false,
          msg: "payment failed, amount paid is not 150 rs",
        });
      }

      console.log("Payment Confirmed");

      const updatedOrder = await part.findOneAndUpdate(
        { razorpayorderid: req.body.payload.payment.entity.order_id },
        { paymentstatus: "payed" },
        {
          new: true,
        }
      );

      console.log("Database Updated");
      console.log(`\nUpdated Order\n\n${updatedOrder}\n\n`);

      return res.send(200).json({ message: "Verified your payment" });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "Internal server Error!" });
    }
  },
};

module.exports = payments;
