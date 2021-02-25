class AppError extends Error {
    constructor(msg, code = 400) {
        super(msg);
        this.status = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;