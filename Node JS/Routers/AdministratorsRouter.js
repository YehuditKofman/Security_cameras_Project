
const express = require("express")
const verifyToken = require("../Middleware/auth").verifyToken;
const upload = require("../Middleware/upload"); // הוספה של המידלוור

const router = express.Router()

const {createAdministrator,updateAdministrator,getAdministratorById,
    getAllMembersByAdministrator,createMemberByAdministrator,getAllMembersNamesByAdministrator,
    createSecurityCamerasByAdministrator,loginAdministrator} = require("../Controllers/AdministratorsController")

router.post("/createAdministrator",createAdministrator)
router.post("/updateAdministrator/:id",updateAdministrator)
router.post("/createMemberByAdministrator/:id", createMemberByAdministrator)
router.post("/createSecurityCamerasByAdministrator/:id", upload.single('video'),verifyToken, createSecurityCamerasByAdministrator);
router.post("/loginAdministrator",loginAdministrator)

router.get("/getAdministratorById/:id",getAdministratorById)
router.get("/getAllMembersByAdministrator/:id",getAllMembersByAdministrator)
router.get("/getAllMembersNamesByAdministrator/:id",verifyToken,getAllMembersNamesByAdministrator)


module.exports = router