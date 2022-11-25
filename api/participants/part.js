const part=require('../models/participants')
const {model} =require("mongoose");

const Part = {

    save: async function (req, res) {
        const {
            name,
            category,
            mailid,
            phno,
            seat,
            amount,
            adress

        } = req.body

        if ((!name) || (!category) || (!mailid) || (!phno)) {
            res.status(400).send({
                sucess: false,
                msg: 'enter all feilds'
            })
        }
        part.find({},'phno',(err,arrdata)=>{

        })


        const newpart = part({
            name: name,
            mailid: mailid,
            phno: phno,
            amount: amount,
            paymentstatus:"pending",
            paymentid:"not available"

        })
        newpart.save((err, newpart) => {
            if (!err) {
                res.status(200).send({
                    success: true,
                    data: newpart
                })
            } else {
                console.log(err)
                res.send(400).send({
                    sucess: false,
                    err
                })
            }
        })
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
