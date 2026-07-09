exports.success = (res, data = {}, message = '') => res.json({ success: true, message, data });
exports.error = (res, status = 500, message = 'Server Error', err = {}) => res.status(status).json({ success: false, message, error: err });

exports.successResponse = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

exports.errorResponse = (res, statusCode, message, error = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
