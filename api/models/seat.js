const mongoose =require('mongoose');
const part = require('../participants/part')
const seatSchema =mongoose.Schema({
    seatno:{
        type:String,
        unique:true
    },
    part:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'part',
        unique:true
    }
})
seatSchema.plugin(require('mongoose-beautiful-unique-validation'));
const seatModel =mongoose.model('seat',seatSchema)
module.export=seatModel;