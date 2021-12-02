import  mongoose  from "mongoose";
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug);
const Schema = mongoose.Schema;


const Product = new Schema({
    title:{type:String,required:true},
    link:{type:String,required: true},
    image:{type:String,required: true},
    description:{type:String,required:true}
  }, {
    timestamps: { createdAt: 'created_at',
                  updatedAt: 'update_at'
                } 
  });

const ProductModel = mongoose.model('Product',Product)
export default ProductModel