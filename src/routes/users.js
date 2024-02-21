import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/UserModel.js';


const router = express.Router();


// api for registration 
router.post('/register',async(req,res)=>{
    const {username,email,password} = req.body;
    const user = await UserModel.findOne({username});
    if(user){
        return res.json({message:"user already exists!"});
    }
    // encrypting the password
        const hashedPassword = await bcrypt.hash(password,10);
    // saving the document into the database {username,email,password}
    if(password===''){
        return res.json({message:"please enter your password"})
    }
    const newUser = new UserModel({username,email,password:hashedPassword});
    try{
            await newUser.save();
            res.json({message:"user registered successfully",signedStatus:true})
    }catch(err){
        console.error(err);
        res.json({message:"please enter your email address"});
    }
})

// api for login 
router.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const user = await UserModel.findOne({username});
    if(!user){
        return res.json({message:"user doesn't exists!"});
    }
    // verifying the password 
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.json({message:"Username or Password is Incorrect!"})
    }
    if(user){
        const token = jwt.sign({id:user._id},'ehsanSecrect');
        res.json({token,userID:user._id,name:user.username,message:"logged in successfully",loggedStatus:true});
    }
})

router.get('/data',async(req,res)=>{
    const getData = await UserModel.find();
    res.json(getData);
})

export {router as ecommRouter};
//exporting the router with alias name ecommRouter

