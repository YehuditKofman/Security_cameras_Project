const express = require("express")
const router = express.Router()
const {createSecurityCameras,addPeopleAnalysis,getPeopleAnalysis} = require("../Controllers/SecurityCamerasController")


router.post("/createSecurityCameras",createSecurityCameras)
router.post("/addPeopleAnalysis/:id", addPeopleAnalysis);

router.get('/getPeopleAnalysis/:id',getPeopleAnalysis)


module.exports = router