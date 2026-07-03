import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectCloudinary from "./config/cloudinary.js"
import connectDb from "./config/database.js";

import authRoutes from "./routes/AuthRoutes.js";
import profileRoutes from "./routes/ProfileRoutes.js"
import courseRoutes from "./routes/CourseRoutes.js"
import paymentRoutes from "./routes/PaymentRoutes.js"
import contactRoutes from "./routes/ContactRoutes.js"
import adminRoutes from "./routes/AdminRoutes.js"

import fileUpload from "express-fileupload";

dotenv.config();
connectDb();
connectCloudinary();

const app = express();

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./tmp"
}));

app.use(express.json());
app.use(cookieParser());

//<-------------------email test------------------------>

import mailSender from "./utils/mailSender.js";

app.get("/test-mail", async (req, res) => {
  try {
    const info = await mailSender(
      "kraj9380286@gmail.com",
      "StudyNotion Test",
      "<h2>If you received this email, SMTP is working.</h2>"
    );

    res.json({
      success: true,
      message: "Email sent",
      info,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
//<------------------------------------->
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes)
app.use("/api/v1/payment", paymentRoutes)
app.use("/api/v1/reach", contactRoutes)
app.use("/api/v1/admin", adminRoutes)
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  res.status(500).json({
    success: false,
    message: err.message,
  });
});
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
