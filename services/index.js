import fs from "fs";

export const allData = (req, res) => {
  res.json(data);
};

export const insertData = async (req, res) => {
  const { name, age, type } = req.body;
  const maxId = Math.max(...data.map((user) => user.id), 0);
  const autoId = maxId + 1;
  const userData = { id: autoId, name, age, type };
  data.push(userData);
  await fs.promises.writeFile("./files/data.json", JSON.stringify(data));

  res.status(200).send(userData);
};

export const updateData = async (req, res) => {
  const id = Number(req.params.id);
  const { name, age, type } = req.body;
  if (typeof age !== "number")
    return res.status(400).json({ message: "Age must be a number" });

  if (!name || !age || !type) {
    return res.status(400).json({
      message: "All fields required",
    });
  } else {
    const updatedData = { name, age, type };

    const newDataUpdated = data.find((a) => a.id === id);

    if (!newDataUpdated) {
      return res.status(404).send("ID not found");
    }
    const index = data.findIndex((user) => user.id === id);
    data[index] = {
      ...data[index],
      name,
      age,
      type,
    };
    await fs.promises.writeFile("./files/data.json", JSON.stringify(data));
    res.send(updatedData);
  }
};

export const deleteData = async (req, res) => {
  const id = Number(req.params.id);
  const initialLength = data.length;
  const deletedData = data.filter((user) => user.id !== id);
  if (initialLength === deletedData.length) {
    res.status(404).json({ message: "user with this id not found" });
  }
  await fs.promises.writeFile("./files/data.json", JSON.stringify(deletedData));
  res.status(200).json({ message: "User deleted successfully" });
};
