function getLogin(req, res, next) {
    // res.locals.title = "Login Page";
    res.render("index");
}

module.exports = { getLogin };