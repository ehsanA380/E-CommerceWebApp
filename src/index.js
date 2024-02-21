import express from "express";
import cors from "cors";
import db from './dbConnection/_db.js'
// import { userRouter } from "./routes/users.js";
import { ecommRouter } from "./routes/users.js";

const app = express();
 db();

app.use(express.json());
app.use(cors());

app.use("/auth",ecommRouter);

 
 app.listen(3002,()=>console.log("server started."));
