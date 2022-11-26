const mongoose =require('mongoose')
require('dotenv').config()

const mongo_uri=process.env.MONGO;
const connect=()=>{
  mongoose.connect(`${mongo_uri}`,{
          useNewUrlParser:true,
          useUnifiedTopology:true
      })
      .then(()=>{
          console.log("sucessfully connected to database")
      })
      .catch((err)=>{
          console.log("connection failed")
          console.log(err)
      })
}

module.exports=connect