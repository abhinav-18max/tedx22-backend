const part=require('../models/participants')
const {model} =require("mongoose");

const Part = {
    add: async function (req, res) {
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



        const newpart = part({
            name: name,
            category: category,
            mailid: mailid,
            phno: phno,
            adress: adress,
            seat: seat,
            amount: amount

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
    find: async function (req, res) {
        //const projection ={_id:0,seat:1};
        part.find({},'seat', (err, arrdata) => {
            if(!err) {
                res.status(200).send({
                    sucess: true,
                    data: arrdata
                })
            }
                else{
                    sucess:false,
                    res.status(400).send({
                        sucess:false,
                        err,
                    })
            }


        });

    }
}

module.exports = Part
