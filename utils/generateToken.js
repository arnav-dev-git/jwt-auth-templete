import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET_TOKEN, {
    expiresIn: "20d",
  });
};

export default generateToken;
