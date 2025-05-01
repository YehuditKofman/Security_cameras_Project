const Administators = require("../Moduls/AdministatorsModule")
const Members = require("../Moduls/MembersModule")
const SecurityCameras = require("../Moduls/SecurityCamerasModule");
const bcrypt = require("bcrypt");


const jwt = require("jsonwebtoken");

//מיצירת מנהל מצלמות אבטחה חדש//ממש אצילי מצידך.

async function createAdministrator(req, res) {
    try {
        const { email, phone, password, name } = req.body;

        // בדיקה אם כל השדות החובה קיימים
        if (!email || !phone || !password || !name) {
            return res.status(400).send("Missing required fields: email, phone, password, or name.");
        }

        let newAdmin = new Administators(req.body);
        await newAdmin.save();


        const token = jwt.sign(
            { id: newAdmin._id, role: "Administrator" },
            process.env.SECRET,
            { expiresIn: "2h" }
        );

        res.status(201).send({
            message: "Administrator created successfully!",
            token: token,
            name: newAdmin.name,
        });
    } catch (error) {
        console.error("Error creating administrator:", error);
        res.status(500).send("Failed to create administrator.");
    }
}

//login מנהל מצלמות אבטחה קיים
async function loginAdministrator(req, res) {

    try {
        const { email, password } = req.body;

        // ננסה קודם לחפש את המשתמש בטבלת המנהלים
        let user = await Administators.findOne({ email });

        let role = "Administrator";

        if (!user) {
            // אם לא נמצא - נבדוק בטבלת העובדים
            user = await Members.findOne({ email });
            role = "Member";
        }

        // אם המשתמש לא נמצא בכלל
        if (!user) {
            return res.status(401).send("Invalid email or password jhyuh.");
        }

        // השוואת הסיסמה עם bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)

        if (!isMatch) {
            return res.status(401).send("Invalid email or password.");
        }



        // יצירת טוקן לאחר התחברות מוצלחת
        const token = jwt.sign(
            { id: admin._id, role: "Administrator" },
            process.env.SECRET
        );

        res.status(200).send({
            message: "Login successful!",
            token: token
        });
    } catch (error) {
        console.error("Error logging in administrator:", error);
        res.status(500).send("Failed to log in administrator.");
    }
}



//עדכון מנהל מצלמות אבטחה קיים
async function updateAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const updatedAdmin = await Administators.findByIdAndUpdate(id, req.body, { new: true }); //והחזרת האובייקט מעודכן  עדכון המנהל במסד הנתונים
        if (!updatedAdmin) {
            return res.status(404).send("Administrator not found.");
        }
        res.status(200).send("Administrator updated successfully!");
    } catch (error) {
        console.error("Error updating administrator:", error);
        res.status(500).send("Failed to update administrator.");
    }
}
//קבלת מנהל לפי מזהה
async function getAdministratorById(req, res) {
    try {
        const { id } = req.params;// קבלת מזהה המנהל מהפרמטרים של הבקשה
        const admin = await Administators.findById(id); // חיפוש המנהל במסד הנתונים
        if (!admin) {
            return res.status(404).send("Administrator not found.");
        }
        res.status(200).json(admin); // החזרת המנהל שנמצא
    } catch (error) {
        console.error("Error fetching administrator:", error);
        res.status(500).send("Failed to fetch administrator.");
    }
}

//קבלת כל העובדים של מנהל זה 
async function getAllMembersByAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const members = await Members.find({ administartorID: id }); // חיפוש כל העובדים של המנהל במסד הנתונים
        if (!members) {
            return res.status(404).send("No members found for this administrator.");
        }
        res.status(200).json(members); // החזרת כל העובדים שנמצאו
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).send("Failed to fetch members.");
    }
}
//קבלת כל השמות של העובדים של מנהל זה
async function getAllMembersNamesByAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const members = await Members.find({ administartorID: id }).select('name'); // חיפוש כל העובדים של המנהל במסד הנתונים
        if (!members) {
            return res.status(404).send("No members found for this administrator.");
        }
        res.status(200).json(members); // החזרת כל העובדים שנמצאו
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).send("Failed to fetch members.");
    }
}

//יצירת עובד חדש למנהל זה
async function createMemberByAdministrator(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // verifyToken יוודא שהטוקן תקין לפני שנגיע לשלב הזה
        //const decoded = jwt.verify(token, process.env.SECRET);  // מחלצים את המידע מהטוקן

        // בדיקה אם מדובר במנהל על פי תפקיד
        // if (decoded.role !== "admin") {
        //     return res.status(403).send("Access denied. You must be an administrator.");
        // }

        // עכשיו אנחנו יודעים שזה מנהל, נוכל להוסיף את העובד
        const { id } = req.params; // מזהה המנהל שנשלח בפרמטר
        let newMember = new Members({
            ...req.body,
            administartorID: id,
            password: hashedPassword
        });
        console.log(req.body)
        console.log(id)
        await newMember.save();



        // עדכון מערך arrMembers של המנהל
        const updatedAdmin = await Administators.findByIdAndUpdate(
            id,
            { $push: { arrMembers: newMember._id } }, // הוספת מזהה העובד למערך
            { new: true } // החזרת המסמך המעודכן
        );

        res.status(201).send("Member created successfully!");
    } catch (error) {
        console.error("Error creating member:", error);
        res.status(500).send("Failed to create member.");
    }
}

//הוספת מצלמת אבטחה חדשה למנהל זה
async function createSecurityCamerasByAdministrator(req, res) {
    try {

        const { id } = req.params;
        if (!req.file) {
            return res.status(400).send("No video file uploaded.");
        }

        // יצירת אובייקט חדש עם מיקום הקובץ
        const newSecurityCamera = new SecurityCameras({
            IDsecurityCamera: Math.floor(Math.random() * 1000000), // מזהה רנדומלי לדוגמה
            length: req.body.length, // אפשר לשלוח אורך או להשאיר ריק
            filePath: req.file.path, // כאן נשמור את הנתיב של הסרטה
        });

        await newSecurityCamera.save();

        const updatedAdmin = await Administators.findByIdAndUpdate(
            id,
            { $push: { arrSecurityCameras: newSecurityCamera._id } },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).send("Administrator not found.");
        }

        res.status(201).send("Security camera created and added to administrator successfully!");
    } catch (error) {
        console.error("Error creating security camera:", error);
        res.status(500).send("Failed to create security camera.");
    }
}
//מחיקת עובד לפי מזהה למנהל זה
async function deleteMemberByAdministrator(req, res) { 
    try {
        const { id } = req.params; // מזהה המנהל שנשלח בפרמטר
        let { memberId } = req.body; // מזהה העובד שנשלח בגוף הבקשה

        // מחיקת העובד ממסד הנתונים
        await Members.findByIdAndDelete(memberId);

        // עדכון מערך arrMembers של המנהל
        const updatedAdmin = await Administators.findByIdAndUpdate(
            id,
            { $pull: { arrMembers: memberId } }, // הסרת מזהה העובד ממערך
            { new: true } // החזרת המסמך המעודכן
        );

        res.status(200).send("Member deleted successfully!");
    } catch (error) {
        console.error("Error deleting member:", error);
        res.status(500).send("Failed to delete member.");
    }
}

// ייצוא הפונקציות שנוצרו
module.exports = {
    createAdministrator, updateAdministrator, getAdministratorById, getAllMembersByAdministrator,
    createMemberByAdministrator, getAllMembersNamesByAdministrator, createSecurityCamerasByAdministrator,
    loginAdministrator, deleteMemberByAdministrator
};
