import express from "express";
import bodyParser from "body-parser";
import { createUserTable } from "./models/dbInstance.js";
import {
  signInUser,
  signUpAdminUser,
  signUpRegularUser,
} from "./userService.js";
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

//HTTP METHODS : GET, POST, PUT, DELETE
// Request Object: Holds data from the browser or the request client (eg. postman)
// Response Object: Holds data given as response to the request

// Base route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sign up Route
app.post("/signup", async (req, res) => {
  return signUpRegularUser(req, res);
});

// Sign up Route
app.post("/admin/signup", async (req, res) => {
  return signUpAdminUser(req, res);
});

// Sign in Route
app.post("/signin", async (req, res) => {
  return signInUser(req, res);
});

app.listen(port, () => {
  createUserTable();
  console.log(`Example app listening on port ${port}`);
});
