import bcrypt from "bcrypt";
import dbOperations from "../models/dbOperations.js";

export const createNewUserService = async (
  first_name,
  last_name,
  email,
  password,
  phone_number,
  role
) => {
  const SALT_ROUNDS = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return await dbOperations.insert("users", {
    first_name,
    last_name,
    email,
    password: hashedPassword,
    phone_number,
    role,
  });
};

export const getAllClientsService = async () => {
  return await dbOperations.findBy("users", { role: "client" }, true);
};

export const getSingleUserByIdService = async (id) => {
  return await dbOperations.findBy("users", { id });
};

export const getSingleUserEmailService = async (email) => {
  return await dbOperations.findBy("users", { email });
};

export const updateUserService = async (
  userId,
  first_name,
  last_name,
  phoneNumber
) => {
  return await dbOperations.updateById("users", userId, {
    phone_number: phoneNumber,
    first_name,
    last_name,
  });
};

export const deleteSingleUserService = async (userId) => {
  return await dbOperations.deleteById("users", userId);
};
