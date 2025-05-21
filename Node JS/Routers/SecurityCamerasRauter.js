
const express = require("express")
const router = express.Router()
const {createSecurityCameras,addPeopleAnalysis} = require("../Controllers/SecurityCamerasController")


router.post("/createSecurityCameras",createSecurityCameras)
router.post("/addPeopleAnalysis/:id", addPeopleAnalysis);


module.exports = router   