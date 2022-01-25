import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

const Menu = new Schema({
    name:{type:String,required: true},
    image:{type:String,required: true},
    description:{type:String,required: true},
    code:{type:String,required: true},
    datail:{type:String,required: true},
  }, {
    timestamps: true,
  });

const MenuModel = mongoose.model('Menu',Menu)
export default MenuModel
