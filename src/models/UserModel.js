import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requird: true

    }
    
},{
    versionKey:false,
});
export const UserModel = mongoose.model('user',UserSchema);