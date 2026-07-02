import express, {Request, Response, NextFunction} from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "./files/data.json");

const content = await fs.promises.readFile("./files/data.json", "utf8");

const app = express();
const data = JSON.parse(content);
export const allData = (req: Request, res: Response) => {
  res.json(data);
};

export const insertData = async (req: Request, res: Response) => {
  const { name, age, type } = req.body;
  const maxId = Math.max(...data.map((user: {id: number}) => user.id), 0);
  const autoId = maxId + 1;
  const userData = { id: autoId, name, age, type };
  data.push(userData);
  await fs.promises.writeFile("./files/data.json", JSON.stringify(data));

  res.status(200).send(userData);
};

export const updateData = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, age, type } = req.body;
  const updatedData = { name, age, type };

  const newDataUpdated = data.find((a: {id: number}) => a.id === id);

  const index = data.findIndex((user: {id: number}) => user.id === id);
  data[index] = {
    ...data[index],
    name,
    age,
    type,
  };
  await fs.promises.writeFile("./files/data.json", JSON.stringify(data));
  res.send(updatedData);
};

export const deleteData = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const initialLength = data.length;
  const deletedData = data.filter((user: {id: number}) => user.id !== id);
  if (initialLength === deletedData.length) {
    res.status(404).json({ message: "user with this id not found" });
  }
  await fs.promises.writeFile("./files/data.json", JSON.stringify(deletedData));
  res.status(200).json({ message: "User deleted successfully" });
};
