import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
    try {
       const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

        const info = await transporter.sendMail({
            from: `"StudyNotion" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        return info;
    } catch (error) {
        console.error("Mail Error:", error);
        throw error;
    }
};

export default mailSender;