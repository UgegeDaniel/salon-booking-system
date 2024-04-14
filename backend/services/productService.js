import dbOperations from "../models/dbOperations.js";

export const createNewProductService = async (
  name,
  description,
  price,
  intended_gender,
  adminId
) => {
  const newProduct = await dbOperations.insert("products", {
    name,
    description,
    price,
    intended_gender,
    type: "service",
    admin_id: adminId,
  });
  return newProduct;
};

export const getAllProductsService = async () => {
  return await dbOperations.getAll("products");
};

export const getSingleProductService = async (id) => {
  return await dbOperations.findBy("products", { id });
};

export const updateProductService = async (
  productId,
  name,
  description,
  price,
  intended_gender
) => {
  return await dbOperations.updateById("products", productId, {
    name,
    description,
    price,
    intended_gender,
    type: "service",
  });
};

export const deleteSingleProduct = async (productId) => {
  return await dbOperations.deleteById("products", productId);
};
