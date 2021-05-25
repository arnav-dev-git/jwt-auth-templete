import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (passwordGiven, passwordInDB) => {
  return await bcrypt.compare(passwordGiven, passwordInDB);
};
