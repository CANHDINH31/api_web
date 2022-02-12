import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Funlearing = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const FunlearingModel = mongoose.model("Funlearing", Funlearing);
export default FunlearingModel;
