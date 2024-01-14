const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  return res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
