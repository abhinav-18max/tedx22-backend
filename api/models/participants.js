const mongoose =require('mongoose');

const shortid=require('shortid')

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
    category:{
        type:String,
        required:[true,"cant be blank"],
        min:6,
        max:100
    },
    seat:{
        type:String,
        unique:true,
        required:[true,"cant be blank"]
    },
    mailid:{
        type:String,
        required:[true,"can't be blank"],
        match: /.+\@.+\..+/,
        unique: true

    },

    amount:{
        type:Number,
        required:true
    },
    phno:{
        type:Number,
        required:[true,"Can't be blank"],
        min:10,
        unique:true
    },
    adress:{
        type:String,
        required:[true,"Can't be blank"],

    }
})
//partSchema.plugin(require('mongoose-beautiful-unique-validation'));
const partModel=mongoose.model('part',partSchema)
module.exports=partModel