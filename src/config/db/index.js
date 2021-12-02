import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
export const connect = async function(){

    try{
        await mongoose.connect(process.env.URL_DATABASE,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect successfully !!!');
    }catch(error){
        console.log('connect failure');
    }
}
