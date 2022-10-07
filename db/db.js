const mongoose =require('mongoose')
const mongo_uri = "mongodb+srv://tedxadmin:m3zULvcN1CTei2Be@cluster0.sr5u7op.mongodb.net/?retryWrites=true&w=majority";
//const mongo_uri=process.env.MONGO;
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