import fs from "fs";
import express from "express";
const app = express();
app.use(express.json());
const content = await fs.promises.readFile("./files/data.json", "utf8");

const data = JSON.parse(content);
app.get("/all");

app.post("/insert");

app.put("/update/:id");

app.delete("/delete/:id");

app.listen(3000);
console.log("Server is running....");
