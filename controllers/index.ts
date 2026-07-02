import express from 'express';
import {
  allData,
  deleteData,
  insertData,
  updateData,
} from "../services/index.js";
import { idChecking, incomingsMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.get("/all", allData);
router.post("/insert", incomingsMiddleware, insertData);
router.put("/update/:id", incomingsMiddleware, idChecking, updateData);
router.delete("/delete/:id", idChecking, deleteData);

export default router;
