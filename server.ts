import fs from "fs";
import express from "express";
import router from "./controllers/index.js";
import { idChecking, incomingsMiddleware } from "./middlewares/index.js";
const app = express();
app.use(express.json());
app.use("/", router);

app.listen(3000);
console.log("Server is running....");
