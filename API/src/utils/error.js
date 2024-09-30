class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.name = "error";

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
