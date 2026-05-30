import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import ConnectDB from "./Config/db.js"
import authRoute from "./Routing/authRouting.js"

//configure connection string //config() method

dotenv.config();

//connect database method
//call function
ConnectDB();

//rest object
const app =express();
//enables CORS for your frontend
app.use(cors({origin:["http://localhost:5173" , "http://localhost:8080"],
    credentials:true,
}));

//middleware 
app.use(express.json());
//routes
app.use("/api" ,authRoute);

app.use("/uploads" , express.static("uploads")); // server uploaded files
//rest api
app.get("/" , (req,res)=>{
    res.send({
        message:"Welcome Page"
    })
})

//port
const PORT = process.env.PORT || 3000;
//run application //using listen method
app.listen(PORT , ()=>{
    console.log(`Server is Running on ${process.env.DEV_MODE} mode on ${PORT}`)
})

