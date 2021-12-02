import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

const Admin = new Schema({
    username:{type:String,required: true},
    password:{type:String,required: true},
  }, {
    timestamps: true,
  });

const AdminModel = mongoose.model('Admin',Admin)
export default AdminModel