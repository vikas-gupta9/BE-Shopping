import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      id:{
        type:String,
      },
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      color: {
        type: String,
      },
      price: {
        type: Number,
      },
      files: {
        type: String,
      },
      quantity: {
        type: Number,
        default:1
      },
})

export default mongoose.model("Carts", cartSchema);