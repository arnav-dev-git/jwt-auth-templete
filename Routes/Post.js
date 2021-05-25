import express from "express";
import User from "../models/user.js";
import verifyAuth from "./verifyAuth.js";
const postRouter = express.Router();

postRouter.get("/", verifyAuth, (req, res) => {
  //   console.log(req.user, " <- user");
  //   res.json({ title: "Checking auth", text: "You shouldn't be here !" });
  res.json(req.user);
});

export default postRouter;
