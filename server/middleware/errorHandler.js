exports.notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack,
  });
};
