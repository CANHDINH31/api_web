import  mongoose  from "mongoose";
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug);
const Schema = mongoose.Schema;


const Detail = new Schema({
    code:{type:String,required: true},
    image:{type:String,required: true},
    name:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:String,required:true},
    author:{type:String,required:true},
  }, {
    timestamps: { createdAt: 'created_at',
                  updatedAt: 'update_at'
                } 
  });

const DetailModel = mongoose.model('Detail',Detail)
export default DetailModel