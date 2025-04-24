
const mongoose = require("mongoose");

const SecurityCamerasModule = mongoose.Schema({
    IDsecurityCamera: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    length: { type: Number },
    filePath: { type: String }, // נתיב שמור לקובץ הסרטה
});

module.exports = mongoose.model("SecurityCameras", SecurityCamerasModule);
