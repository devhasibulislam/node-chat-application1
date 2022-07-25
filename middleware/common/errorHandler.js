const createError = require('http-errors');

function notFoundHandler(req, res, next) {
    next(createError(404, "Page Not Found!"));
}

function errorHandler(err, req, res, next) {
    res.locals.error = process.env.NODE_ENV === "development"
        ? err
        : { error: err.message };

    res.status(err.status || 500);

    if (res.locals.html) {
        // html response
        res.locals.title = "Error Page";
        res.render("error");
    } else {
        // json response
        res.json(res.locals.error);
    }
}

module.exports = { notFoundHandler, errorHandler };
