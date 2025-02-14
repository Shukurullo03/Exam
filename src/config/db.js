import mongoose from "mongoose";
const url = process.env.DB_URL;
const connectDB = async () => {
  await mongoose.connect(url, {
    dbName: "businessNetwork",
  });
};
export default connectDB;
