import express from "express";
const authRouter = express.Router();

//encryption
// import bcrypt from "bcryptjs";

//TOKENS
import generateToken from "../utils/generateToken.js";

//MODEL IMPORT
import User from "../models/user.js";
import { registerValidation, loginValidation } from "../utils/validation.js";
import { getHashedPassword, comparePassword } from "../utils/password.js";

authRouter.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400).send("Email already exists");
    } else {
      const hashedPassword = await getHashedPassword(req.body.password);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      try {
        const savedUser = await user.save();
        res.send(savedUser._id);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  }
});

authRouter.post("/login", async (req, res) => {
  //Validate
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    //checking the Email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("Email dose not exists");
    } else {
      //checking the password
      const validPassword = await comparePassword(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(400).send("Invalid Password");
      } else {
        // const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
        //   expiresIn: "10d",
        // });
        const token = generateToken(user._id);
        res.header("auth-token", token).send(token);
      }
    }
  }
});

export default authRouter;
