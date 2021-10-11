
// example errorHandler middleware

export function generic(err, req, res, next) {
    if (!err || typeof(err) != 'object') {
        res.status(500).send(err);
    } else {
        if (err.stack)
        console.error(err.stack);

        if (!err.status)
            err.status = 500;
        if (!err.message)
            err.message = "An unexpected error occurred.";

        res.status(err.status).send(err);
    }
}