import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: `"TabOS" <${process.env.ZOHO_EMAIL}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
