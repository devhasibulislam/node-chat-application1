// external imports
const express = require('express');

// internal imports
const { getInbox } = require('../controller/inboxController');
const decorateHTMLResponse = require('../middleware/common/decorateHTMLResponse');
const { checkLogin } = require("../middleware/common/checkLogin");

const router = express.Router();

router.get("/", decorateHTMLResponse("Inbox"), checkLogin, getInbox);

module.exports = router;