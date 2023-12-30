import query from "./query.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (email) => {
  const token = jwt.sign(
    {
      email,
      role: "regular",
    },
    "secret",
    { expiresIn: "3d" }
  );
  return token;
};

const isValidUserDetails = (email, password, firstName, lastName) => {
  if (!email || !password || !firstName || !lastName) {
    return false;
  }
  const { isStrongPassword, isEmail } = validator;
  const validEmail = isEmail(email);
  const validPassword = isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
  if (validEmail && validPassword) {
    return true;
  }
  return false;
};

export const signUpUser = async (req, res, role) => {
  const userDetails = req.body;
  const { email, password, fistName, lastName } = userDetails;
  if (!isValidUserDetails(email, password, fistName, lastName)) {
    return res.status(400).json({
      msg: "Invalid User Details",
    });
  }
  bcrypt.hash(password, 10, async function (err, hashedPassword) {
    if (err) console.log(err);
    const queryString = `INSERT INTO users (user_id, firstName, lastName, email, password, role) VALUES (uuid_generate_v4(), '${fistName}', '${lastName}','${email}', '${hashedPassword}', ${role});`;
    await query(queryString);
    const token = createToken(email);
    return res.status(201).json({
      msg: "Successfully signed up",
      token,
    });
  });
};

export const signUpRegularUser = async (req, res) => {
  return signUpUser(req, res, "regular");
};

export const signUpAdminUser = async (req, res) => {
  return signUpUser(req, res, "admin");
};

export const signInUser = async (req, res) => {
  const userDetails = req.body;
  const { email, password } = userDetails;
  const queryString = `SELECT * FROM users WHERE email = '${email}';`;
  const foundUser = await query(queryString);
  try {
    if (foundUser) {
      bcrypt.compare(password, foundUser[0].password, function (err, result) {
        if (err) {
          return res.status(500).json({ msg: "Internal Server Error" });
        }
        if (result) {
          const token = createToken(email);
          return res.status(200).json({
            msg: "Successfully Signed In",
            token,
          });
        }
      });
    } else {
      return res.status(404).json({
        msg: "Incorrect Details",
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
