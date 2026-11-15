const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  console.error(err);
  res.status(status).json({
    message: status === 500 ? 'Internal server error' : err.message,
  });
};

module.exports = { notFound, errorHandler };