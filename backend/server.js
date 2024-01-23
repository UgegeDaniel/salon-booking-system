import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import userController from "./controllers/userController.js";
import productController from "./controllers/productController.js";
import appointmentController from "./controllers/appointmentController.js";
import errorHandler from "./middlewares/errorHanlerMiddleware.js";
import dbInit from "./models/dbInit.js";

//M === Model --- handles code relating to the database
//V === View  --- handles code relating to the frontend (Monoliths)
//C === Controllers --- Handles code relating to request and response


config();
const app = express();

//Middleware allows the server to access the request body
app.use(bodyParser.json());

//Middleware that allows the frontend to make request from any source
//Cross Origin Resource Sharing
app.use(cors());

//User Route
app.use("/user", userController);

//Product Route
app.use("/product", productController);

//Appointment Route
app.use("/appointment", appointmentController);

//Base Route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    SBS: "Hello World",
  });
});

//Middleware that handles all unhandled Errors
app.use(errorHandler);

//Set a port and a fallback
//process.env gets data stored in the env file. 
//We use the .env file to store secrets, tokens etc
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  //Initialize the Database
  dbInit();
  console.log(`Server is running on port ${PORT}`);
});
