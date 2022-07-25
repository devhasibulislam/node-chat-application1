// external imports
const express = require('express');

// internal imports
const { getUsers } = require('../controller/userController');
const decorateHTMLResponse = require('../middleware/common/decorateHTMLResponse');

const router = express.Router();

router.get("/", decorateHTMLResponse("User"), getUsers);

module.exports = router;