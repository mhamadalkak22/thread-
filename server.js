import express from "express"
import dotenv from "dotenv"
import connectDB from './DB/connectDB.js';
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js"
import postRoutes from "./Routes/postRoutes.js"


dotenv.config();
connectDB();
const app=express();


const PORT=process.env.PORT|| 5000;
//middlewares

app.use(express.json());//to  parse json data into req.body
app.use(express.urlencoded({extended:true}))//to pare c=data form into req.body
app.use(cookieParser());
//routes
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);

app.listen(PORT,()=>console.log(`server start at local host ${PORT}`));