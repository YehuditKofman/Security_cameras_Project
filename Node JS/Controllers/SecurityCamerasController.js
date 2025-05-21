const securityCameras=require("../Moduls/SecurityCamerasModule")

// פונקציה להוספת מצלמת אבטחה
async function createSecurityCameras(req, res) {
    try {
        const { IDsecurityCamera, date, length } = req.body; // קבלת נתוני מצלמת האבטחה מהבקשה
        const newSecurityCamera = new securityCameras({ IDsecurityCamera, date, length }); // יצירת מצלמת אבטחה חדשה
        await newSecurityCamera.save(); // שמירת מצלמת האבטחה במסד הנתונים
        res.status(201).json(newSecurityCamera); // החזרת מצלמת האבטחה שנוצרה
    } catch (error) {
        console.error("Error creating security camera:", error);
        res.status(500).send("Failed to create security camera.");
    }
}

// פונקציה לעדכון ההסרטה עם מערך ניתוח נתונים (peoplePerMinute)
async function addPeopleAnalysis(req, res) {
  try {
    const { id } = req.params; // קבלת מזהה ההסרטה מה-URL
    const { peoplePerMinute } = req.body; // קבלת מערך הנתונים מהבקשה

    if (!peoplePerMinute || !Array.isArray(peoplePerMinute)) {
      return res.status(400).json({ error: "חסר מערך תקין של peoplePerMinute" });
    }

    const updatedRecording = await securityCameras.findByIdAndUpdate(
      id,
      { peoplePerMinute },
      { new: true } // מחזיר את המסמך המעודכן
    );

    if (!updatedRecording) {
      return res.status(404).json({ error: "הסרטה לא נמצאה" });
    }

    res.status(200).json(updatedRecording);
  } catch (error) {
    console.error("שגיאה בעדכון הנתונים של ההסרטה:", error);
    res.status(500).send("נכשל בעדכון הנתונים.");
  }
}


module.exports = {createSecurityCameras,addPeopleAnalysis}