import mongoose from 'mongoose';
// database connection
async function db(){
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/Ecomm');
        console.log('connected',mongoose.connection.readyState);
    }
   catch(err){
    console.log(err);
   }
}

export default db