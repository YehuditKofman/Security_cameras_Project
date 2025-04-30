const e = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const AdministartorsModule = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "Administrator" },
    arrMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Members'}],
    arrSecurityCameras:[{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'}],
    arrAnalysisSchema: [{
        date: { type: Date, default: Date.now },
        sortAnalysis: { type: String },
        numberSecurityCamera: {type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'},
        IdSecurityCamera :{type:Number}
    }]
})



AdministartorsModule.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model( "Administrators",AdministartorsModule )

