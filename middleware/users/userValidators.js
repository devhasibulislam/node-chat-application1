// external imports
const createError = require('http-errors');
const { check, validationResult } = require('express-validator');
const path = require('path');
const { unlink } = require('fs');

// internal imports
const User = require('../../models/People');

// add user
const addUserValidator = [
    check("name")
        .isLength({ min: 1 })
        .withMessage("Name field is required!")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),

    check("email")
        .isEmail()
        .withMessage("Invalid email input!")
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError("Email already in use!")
                }
            } catch (error) {
                throw createError(error.message)
            }
        }),

    check("mobile")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Use Bangladeshi mobile number with +880 country code!")
        .custom(async (value) => {
            try {
                const user = await User.findOne({ mobile: value });
                if (user) {
                    throw createError("Mobile number already in use!")
                }
            } catch (error) {
                throw createError(error.message)
            }
        }),

    check("password")
        .isStrongPassword()
        .withMessage("Must use 1 uppercase, 1 lowercase, 1 number & 1 symbol!")
];

function addUserValidationHandler(req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // remove inserted file
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/avatars/${filename}`),
                err => {
                    if (err) {
                        console.log(err);
                    }
                }
            )
        }

        // response the error
        res.status(500).json({
            errors: mappedErrors,
        })
    }
}

module.exports = {
    addUserValidator,
    addUserValidationHandler
};