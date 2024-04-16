const multer = require('multer');
const path = require('path');
const fs = require('fs');
const uploadFolder = 'uploads/';

if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(uploadFolder)
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname}`;
        cb(null, filename);
    }
});
const upload = multer({ storage: storage });
module.exports = upload;