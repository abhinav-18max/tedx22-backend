const mongoose =require('mongoose');

const shortid=require('shortid')

const seatSchema =mongoose.Schema({

})
const partSchema = mongoose.Schema({
    part_id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    name:{
        type:String,
        require:[true,"can't be blank"],
        min:6,
        index:true
    },
    mailid:{
        type:String,
        required:[true,"can't be blank"],
        match: /.+\@.+\..+/,
       // unique: true

    },
    phno:{
        type:Number,
        required:[true,"Can't be blank"],
        min:10
       
    },
    paymentstatus:{
        type:String,
        required:[true,"Can't be blank"]
    },
    razorpayorderid:{
        type:String,
        required:[true,"Can't be blank"]
    }
})
//partSchema.plugin(require('mongoose-beautiful-unique-validation'));
const partModel=mongoose.model('part',partSchema)
module.exports=partModel