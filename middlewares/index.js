import fs from "fs";

const originalData = await fs.promises.readFile("./files/data.json", "utf8");

const data = JSON.parse(originalData);
export const incomingsMiddleware = (req, res, next) => {
  const { name, age, type } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "Name is required.",
    });
  }

  if (!age) {
    return res.status(400).json({
      message: "Age is required.",
    });
  }

  if (!type) {
    return res.status(400).json({
      message: "Type is required.",
    });
  }

  next();
};

export const idChecking = (req, res, next) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Please enter a valid numeric ID.",
    });
  }
  if (id <= 0) {
    return res.status(400).json({
      message: "ID must be a greater than 0.",
    });
  }

  const user = data.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }
  next();
};
