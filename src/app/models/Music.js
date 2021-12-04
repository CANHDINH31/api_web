import  mongoose  from "mongoose";
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug);
const Schema = mongoose.Schema;


const Music = new Schema({
    code:{type:String,required:true},
    path:{type:String,required: true},
    name:{type:String,required:true}
  }, {
    timestamps: { createdAt: 'created_at',
                  updatedAt: 'update_at'
                } 
  });

const MusicModel = mongoose.model('Music',Music)
export default MusicModel