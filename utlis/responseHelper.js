

function sendErrorResponse(res, statusCode, message, extraData = {}) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...extraData,
  });
}

function sendSuccessResponse(res, statusCode, message, extraData = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...extraData,
  });
}

module.exports = {
  sendErrorResponse,
  sendSuccessResponse,
};
