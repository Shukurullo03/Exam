import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    role: { type: String, default: "user" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default mongoose.model("User", userSchema);
