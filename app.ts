import express from "express";
import { config } from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"

config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
