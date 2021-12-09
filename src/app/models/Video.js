import  mongoose  from "mongoose";
const Schema = mongoose.Schema;

const Video = new Schema({
    name:{type:String,required: true},
    type:{type:String,required: true},
    param:{type:String,required: true},
    link:{type:String,required: true},
    image:{type:String,required: true},
  }, {
    timestamps: true,
  });

const VideoModel = mongoose.model('Video',Video)
export default VideoModel