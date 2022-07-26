// external imports
const express = require('express');

// internal imports
const {
    getUsers,
    addUser,
    removeUser
} = require('../controller/userController');
const decorateHTMLResponse = require('../middleware/common/decorateHTMLResponse');
const avatarUpload = require('../middleware/users/avatarUpload');
const {
    addUserValidator,
    addUserValidationHandler
} = require('../middleware/users/userValidators');

const router = express.Router();

// user page
router.get("/", decorateHTMLResponse("User"), getUsers);

// add user
router.post("/",
    avatarUpload,
    addUserValidator,
    addUserValidationHandler,
    addUser
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;