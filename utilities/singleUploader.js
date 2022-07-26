// external imports
const createError = require('http-errors');
const multer = require('multer');
const path = require('path');

function uploader(
    subfolder_path,
    allowed_file_type,
    max_file_size,
    error_msg
) {
    // file upload directory
    const UPLOAD_DIR = `${__dirname}/../public/${subfolder_path}`; // as upload folder

    // define the storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, UPLOAD_DIR)
        },
        filename: function (req, file, cb) {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace("fileExt", "")
                    .toLowerCase()
                    .split(" ")
                    .join("_")
                + "-"
                + Date.now();

            cb(null, fileName + fileExt);
        }
    })

    // prepare final multer upload object
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size
        },
        fileFilter: (req, file, cb) => {
            if (allowed_file_type.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(error_msg))
            }
        }
    })

    return upload;
}

module.exports = uploader;
