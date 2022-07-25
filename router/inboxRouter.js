// external imports
const express = require('express');

// internal imports
const { getInbox } = require('../controller/inboxController');
const decorateHTMLResponse = require('../middleware/common/decorateHTMLResponse');

const router = express.Router();

router.get("/", decorateHTMLResponse("Inbox"), getInbox);

module.exports = router;