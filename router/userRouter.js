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
const { checkLogin } = require("../middleware/common/checkLogin");

const router = express.Router();

// user page
router.get("/", decorateHTMLResponse("Users"), checkLogin, getUsers);

// add user
router.post("/",
    checkLogin,
    avatarUpload,
    addUserValidator,
    addUserValidationHandler,
    addUser
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;