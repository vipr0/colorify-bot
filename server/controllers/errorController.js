module.exports = (err, req, res, next) => {
    console.error(err)
    
    let { message } = err;
    let statusCode = err.status || 500;


    // Mongo duplicate error
    if (err.code === 11000) {
        message = `User with ${Object.entries(err.keyValue)[0][1]} alredy exists`;
        statusCode = 400;
    }

    // Mongo validation error
    if (err.errors && err._message === 'Voting validation failed') {
        message = 'This fields required: ';

        Object.keys(err.errors).forEach((error) => {
            message += ` ${err.errors[error].path};`;
        });

        statusCode = 400;
    }

    res.status(statusCode).json({
        status: 'error',
        message,
        err,
    });
};