const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging

  if (res.headersSent) {
    return next(err); // If headers sent, delegate to default error handler
  }

  // Handle specific error types with appropriate responses
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON" });
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).json({ error: errors });
  }

  // Handle other errors with generic 500 status code
  res.status(500).json({ error: "Internal Server Error" });
};

module.exports = errorHandler;
