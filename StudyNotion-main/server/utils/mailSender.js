const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Add this
await transporter.verify();
console.log("SMTP verified successfully");

const info = await transporter.sendMail({
  from: `"StudyNotion" <${process.env.MAIL_FROM}>`,
  to: email,
  subject: title,
  html: body,
});