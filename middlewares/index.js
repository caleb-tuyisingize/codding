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
  const id = req.params.id;
  if (typeof id === "string") {
    return res.status(400).json({ message: "Please enter a propper ID" });
  }
  next();
};
