import express from "express";
import mongoose from "mongoose";
import studentRouter from "./routes/studentRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import productRouter from "./routes/productRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import orderRouter from "./routes/orderRouter.js";


dotenv.config(); //load environment variables from .env file

const app = express(); 

app.use(cors({})); //enable cors for all routes

app.use(express.json()) //middle ware *ewana data tika piliwelata hadana ek karanne
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(   //authentication middleware
  (req, res, next) => { 
    let token = req.header("Authorization"); 

    if (token != null) {
      token = token.replace("Bearer ", "");
      //console.log("token", token);

        jwt.verify(token, process.env.jwtSecretKey,(err,decoded)=>{ //verify the token and decode it

            if(decoded == null){
              res.json({
                message: "invalid token plese login again"
              })
              return //stop the execution
          }else{
            req.user = decoded; //store the decoded token in the request object 
            console.log("decoded", decoded);
          }
         }
       )
      }
      next()
  }
)


//create data base connection 
const connectionString = process.env.MONGO_URI 

mongoose.connect(connectionString) 
.then(  ()=>{
     console.log("database connected !✅");
  }).catch(  ()=>{
    console.log("database connction err");
  }
)




app.use("/api/students",studentRouter);
app.use("/api/users", userRouter);  
app.use("/api/products",productRouter);
app.use("/api/orders", orderRouter);





function success(){
    console.log("sever is Started!✅")
}
app.listen(5000, success)
