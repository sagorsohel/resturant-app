// utils/responseHelper.js
function sendErrorResponse(res, statusCode, message, extraData = {}) {
  return res.status(statusCode).json({
    message,
    success: false,
    ...extraData,
  });
}

module.exports = { sendErrorResponse };
