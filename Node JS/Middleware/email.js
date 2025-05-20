
const nodemailer = require("nodemailer");

async function sendEmails(to, subject, text) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    };

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log("Sending email to:", to); // לוג של הכתובת שאליה נשלח המייל
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response); // לוג של התגובה מהשרת
    } catch (error) {
        console.error("Error sending email:", error.message); // לוג של שגיאה
    }
}

// דוגמה לקריאה לפונקציה

module.exports = {
    sendEmails: sendEmails // שנה ל sendEmails
};
