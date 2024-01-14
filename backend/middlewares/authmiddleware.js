import jwt from "jsonwebtoken";

const verifyAuthToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not provided." });
  }

  try {
    const decodedToken = jwt.verify(token, "your_secret_key");
    req.user = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Invalid token.", error });
  }
};

export default verifyAuthToken;
