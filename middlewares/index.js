export const incomingsMiddleware = (req, res, next) => {
  const { name, age, type } = req.body;
  if (!name) {
    return res.json({ message: "fields name is require" });
  }else if (!age) {
    return res.json({ message: "fields age is require" });
  }else if (!type) {
    return res.json({ message: "fields type is require" });
  }else{

      next();
    }
};

export const idChecking = (req, res, next) => {
  const id = req.params.id;
  if (id===null || typeof id=== string) {
    return res.json({ message: "Please enter a propper ID" });
  }
  next();
};
