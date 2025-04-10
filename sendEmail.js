const Example = require('./model/Example');
const connectDB = require('./database/db');
const nodemailer = require("nodemailer");
require('dotenv').config()

console.log(process.env.USERNAME)
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
    },
});

const emailList = async () => {
    try {
        const users = await Example.find();
        const list = users.map(user => user.email);
        return list;
    } catch (err) {
        console.error("Could not fetch emails:", err);
        return [];
    }
};

const sendEmail = async () => {
    await connectDB(); // 💥 Connect to MongoDB before anything

    const list = await emailList(); // ✅ Get list after connection
    if (list.length === 0) {
        console.log("📭 No emails found. Cancelling send.");
        return;
    }

    const info = await transporter.sendMail({
        from: process.env.USER,
        to: list, // 💡 This now contains actual email addresses
        subject: "Testing DATABASE",
        text: "This is a test email sent using Nodemailer.",
    });
    console.log('messages were successfully sent')
}

module.exports = sendEmail