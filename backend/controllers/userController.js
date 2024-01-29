import { Router } from "express";
import bcrypt from "bcrypt";
import {
  createNewUserService,
  deleteSingleUserService,
  getAllClientsService,
  getSingleUserByIdService,
  getSingleUserEmailService,
  updateUserService,
} from "../services/userService.js";
import jwt from "jsonwebtoken";
import {
  allowAdminAccessOnly,
  allowAdminAndClientAccess,
} from "../middlewares/accessControlMiddleware.js";
import verifyAuthToken from "../middlewares/authmiddleware.js";
import isValidUserDetails from "../services/validationService.js";

//TYPES OF REQUEST = POST(CREATE), GET(READ), PUT(UPDATE), DELETE(DELETE)
// POST, GET, PUT AND DELETE ARE CALLED HTTP VERBS
// CRUD OPERATIONS

// Get instance of the controller
const userController = Router();

// Create User
// General Access
// /user/sign-up
userController.post("/sign-up", async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number, role } =
      req.body;
    // Validate input
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !phone_number ||
      !role
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Incomplete Credentials" });
    }
    const validatedCredentials = isValidUserDetails(email, password);
    if (!validatedCredentials.status) {
      return res.status(400).json({
        success: false,
        message: validatedCredentials.message,
      });
    }
    const existingUser = await getSingleUserEmailService(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Credentials" });
    }
    const newUser = await createNewUserService(
      first_name,
      last_name,
      email,
      password,
      phone_number,
      role
    );
    const token = jwt.sign(
      { userId: newUser.id, role },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    return res.status(201).json({
      success: true,
      user: newUser,
      message: "User created successfully.",
      token,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Log in User
// General Access
// /user/log-in
userController.post("/log-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!password || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Incomplete Credentials" });
    }
    const validatedCredentials = isValidUserDetails(email, password);
    if (!validatedCredentials.status) {
      return res.status(400).json({
        success: false,
        message: validatedCredentials.message,
      });
    }
    const existingUser = await getSingleUserEmailService(email);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User Credentials" });
    }
    if (isPasswordValid) {
      const token = jwt.sign(
        { userId: existingUser.id, role: existingUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "3d",
        }
      );
      return res.status(200).json({
        success: true,
        user: existingUser,
        message: "User authenticated successfully.",
        token,
      });
    }
    return res
      .status(400)
      .json({ success: false, message: "Invalid User Credentials" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

// Read All Clients
// Admin Access
// /user/clients
userController.get(
  "/clients",
  verifyAuthToken,
  allowAdminAccessOnly,
  async (req, res) => {
    try {
      const clients = await getAllClientsService();
      res.status(200).json({ success: true, clients });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Update User by ID
// Admin and Client Access
userController.put(
  "/update-user",
  verifyAuthToken,
  allowAdminAndClientAccess,
  async (req, res) => {
    try {
      const { userId } = req.user;
      const { first_name, last_name, phoneNumber } = req.body;
      const user = await getSingleUserByIdService(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }
      const updatedUser = await updateUserService(
        userId,
        first_name,
        last_name,
        phoneNumber
      );
      res.status(200).json({
        success: true,
        user: updatedUser,
        message: "User updated successfully.",
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

// Delete User by ID
// Admin Access
// users/delete-user/:userId
userController.delete(
  "/delete-user/:userId",
  verifyAuthToken,
  allowAdminAccessOnly,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await getSingleUserByIdService(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found." });
      }
      const deletedUser = await deleteSingleUserService(userId);
      res.status(200).json({
        user: deletedUser,
        message: "User deleted successfully.",
      });
    } catch (error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
);

export default userController;
