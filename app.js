import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

//DATABASE
import connectDB from "./database/connectdb.js";
connectDB();
//ROUTES

//MIDDLEWARES IMPORT
import router from "./Routes/Auth.js";

//MIDDLEWARES
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).send("Hello Auth api");
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`server is running at ${process.env.PORT}`);
});
