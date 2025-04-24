const multer = require('multer');
const path = require('path');

// הגדרות האחסון
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // תקייה איפה שנשמור את הסרטות
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // שם קובץ ייחודי
    }
});

// פילטר קבצים (נבדוק שמעלים רק וידאו)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only videos are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
