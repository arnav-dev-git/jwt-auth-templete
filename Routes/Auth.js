import express from "express";
const router = express.Router();

//MODEL IMPORT
import User from "../models/user.js";

router.get("/register", (req, res) => {
  res.send("hii sign up");
});

export default router;
