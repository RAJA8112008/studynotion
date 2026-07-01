import mongoose from "mongoose";
import otpTemplate from "../mail/templates/emailVerifiation.js";
import mailSender from "../utils/mailSender.js";

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,  // OTP expires in 5 minutes
    }
});

// Send verification email when OTP is created
async function sendVerificationEmail(email, otp) {
    try {
        await mailSender(email, "OTP Verification - StudyNotion", otpTemplate(otp));
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw error;
    }
}

OTPSchema.pre("save", async function () {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
});

const OTP = mongoose.model("OTP", OTPSchema);
export default OTP;