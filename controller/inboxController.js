function getInbox(req, res, next) {
    // res.locals.title = "Inbox Page";
    res.render("inbox");
}

module.exports = { getInbox };