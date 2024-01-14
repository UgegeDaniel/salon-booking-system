import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import userController from "./controllers/userController.js";
import productController from "./controllers/productController.js";
import appointmentController from "./controllers/appointmentController.js";
import errorHandler from "./middlewares/errorHanlerMiddleware.js";
import dbInit from "./models/dbInit.js";

config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/user", userController);
app.use("/product", productController);
app.use("/appointment", appointmentController);

app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  dbInit();
  console.log(`Server is running on port ${PORT}`);
});
