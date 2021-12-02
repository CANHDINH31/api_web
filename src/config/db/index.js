import mongoose from 'mongoose';

export const connect = async function(){

    try{
        await mongoose.connect('mongodb+srv://dinhphamcanh:dinhphamcanh400@cluster0.of6s6.mongodb.net/API_PICTURE?retryWrites=true&w=majority',{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('connect successfully !!!');
    }catch(error){
        console.log('connect failure');
    }
}
