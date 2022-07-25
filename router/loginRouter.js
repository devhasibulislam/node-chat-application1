// external imports
const express = require('express');

// internal imports
const { getLogin } = require('../controller/loginController');
const decorateHTMLResponse = require('../middleware/common/decorateHTMLResponse');

const router = express.Router();

router.get("/", decorateHTMLResponse("Login"), getLogin);

module.exports = router;