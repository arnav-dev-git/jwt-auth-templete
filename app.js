import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

//cors
import cors from "cors";
app.use(cors());

//DATABASE
import connectDB from "./database/connectdb.js";
connectDB();
//ROUTES

//MIDDLEWARES IMPORT
import authRouter from "./Routes/Auth.js";
import postRouter from "./Routes/Post.js";
// import verifyAuth from "./Routes/verifyAuth.js";

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded());
app.use("/api", authRouter);
app.use("/post", postRouter);
// app.use("/post", verifyAuth, postRouter);

app.get("/", (req, res) => {
  res.status(200).send("Hello Auth api");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running at ${process.env.PORT}`);
});
