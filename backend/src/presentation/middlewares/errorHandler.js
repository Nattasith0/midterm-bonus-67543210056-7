// backend/src/presentation/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error("API Error:", err);

  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
    timestamp: new Date().toISOString(),
  });
}

module.exports = errorHandler;
