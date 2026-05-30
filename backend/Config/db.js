import mongoose from "mongoose";

//create function of database connection

const ConnectDB =async()=>{
    try{  //application connect to database //using mongoose.connect
           const conn =await mongoose.connect(process.env.MONGO_URI)
           console.log(`Connect to MongoDB Database ${conn.connection.host}`)
    }
    catch(error){
             console.log(`Error in MongoDB ${error}`)
    }
}

export default ConnectDB