import jwt from "jsonwebtoken";

const verifyAuth = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).send("Access Denied");
  } else {
    try {
      const verified = jwt.verify(token, process.env.SECRET_TOKEN);
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send("Invalid Token");
      next();
    }
  }
};

export default verifyAuth;
