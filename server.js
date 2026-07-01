import fs from "fs";
import express from "express";
const app = express();
app.use(express.json());
const content = await fs.promises.readFile("./files/data.json", "utf8");

const data = JSON.parse(content);
app.get("/all", (req, res) => {
  res.json(data);
});

app.post("/insert", (req, res) => {
  const { name, age, type } = req.body;
  const id = data.length - 1;
  const autoId = data[id];
  const userData = { id: autoId.id + 1, name, age, type };
  data.push(userData);
  try {
    fs.writeFile("./files/data.json", JSON.stringify(data), (err) => {
      if (err) {
        res.status(404).json({ message: "Failed to write file" });
      }
    });
    res.status(200).send(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error occured" });
  }
});

app.put("/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, age, type } = req.body;
  const updatedData = { name, age, type };
  const newDataUpdated = data.find((a) => a.id === id);

  if (!newDataUpdated) {
    res.status(404).send("ID not found");
  }

  newDataUpdated.name = name;
  newDataUpdated.age = age;
  newDataUpdated.type = type;
  try {
    fs.writeFile("./files/data.json", JSON.stringify(data), (err) => {
      res.status(404).json({ message: "Failed to update" });
    });
    res.send(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Server error occured" });
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = data.length;
  const deletedData = data.filter((user) => user.id !== id);
  if (initialLength === deletedData.length) {
    res.status(404).json({ message: "user with this id not found" });
  }
  try {
    fs.writeFile("./files/data.json", JSON.stringify(deletedData), (error) => {
      if (error) {
        res.status(401).json({ message: "Bad request" });
      }
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error occured" });
  }
});

app.listen(3000);
console.log("Server is running....");
