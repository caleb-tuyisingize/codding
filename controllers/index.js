import express from "express";
import { allData, deleteData, insertData, updateData } from "../services/index.js";

const router = express.Router();

router.get("/all", allData);
router.post("/insert", insertData);
router.put("/update/:id", updateData);
router.delete("/delete/:id", deleteData);

export default router;
