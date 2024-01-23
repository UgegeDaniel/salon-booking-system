import jwt from "jsonwebtoken";

const verifyAuthToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not provided." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
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
