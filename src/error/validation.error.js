const sendErrorResponse = (res, message, code = 400) => {
  return res.status(code).json({
    status: "error",
    error: true,
    message,
  });
};

module.exports = sendErrorResponse;
