function getUsers(req, res, next) {
    // res.locals.title = "Users Page";
    res.render("users");
}

module.exports = { getUsers };