import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import Routes from "./routes/routes.js";
const app = express();
app.use(express.json());
app.use("/api", Routes());
const PORT = process.env.PORT || 8080;
const bootstrap = async () => {
  try {
    await connectDB();
    console.log("Baza ishga tushrild");
    app.listen(PORT, () => {
      console.log("Server is running PORT",PORT);
    });
  } catch (error) {
    console.error(error.message);
  }
};
bootstrap();
