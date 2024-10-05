const httpStatus = require("http-status");

module.exports = {
  noDuplicateError: {
    status: "error",
    error: true,
    message: "Already exists",
    statusCode: httpStatus.BAD_REQUEST,
  },

  handleValidationError: (err) => {
    let { errors } = err;
    let errorFields = Object.keys(errors);

    return {
      status: "error",
      error: true,
      message: "Invalid Fields",
      fields: errorFields,
      statusCode: httpStatus.BAD_REQUEST,
    };
  },

  doesNotExistError: {
    status: "error",
    error: true,
    message: "Does not exist",
    statusCode: httpStatus.NOT_FOUND,
  },

  passwordMismatchError: {
    status: "error",
    error: true,
    message: "Invalid password",
    statusCode: httpStatus.UNAUTHORIZED,
  },

  invalidTokenError: {
    status: "error",
    error: true,
    message: "Invalid token",
    statusCode: httpStatus.UNAUTHORIZED,
  },

  invalidVerificationEmail: {
    status: "error",
    error: true,
    message: "Invalid verification email",
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  },

  defaultError: {
    status: "error",
    error: true,
    message: "Internal Server Error",
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
  },
};
