import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: String,
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
},{
  versionKey:false,
  timestamps:true
});
export default mongoose.model("Post", postSchema);
