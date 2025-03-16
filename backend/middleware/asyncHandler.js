const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res.status(500).json({ message: error.message });
  });
};

export default asyncHandler;
// This file is a middleware function that wraps an asynchronous route
// handler function and catches any errors that occur during its execution.
