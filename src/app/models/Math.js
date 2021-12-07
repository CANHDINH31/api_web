import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

const Math = new Schema({
    name:{type:String,required: true},
    image:{type:String,required:true},
    mathid:{type:String,required: true},
  }, {
    timestamps: true,
  });

const MathModel = mongoose.model('Math',Math)
export default MathModel