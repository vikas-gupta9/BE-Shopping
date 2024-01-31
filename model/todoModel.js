import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  files: [
    {
      fileName: String,
      filePath: String,
      fileSize: String,
    },
  ],
});

export default mongoose.model("Tasks", todoSchema);

// status: {
//   type: String,
//   enum: ["Incomplete", "Complete"],
//   default: "Incomplete",
// },
// statusCode: {
//   type: Number,
//   required: true,
// },
