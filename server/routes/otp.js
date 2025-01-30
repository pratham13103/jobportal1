const express = require("express");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();
const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const sns = new AWS.SNS();
const otpStore = new Map();

const generateOtp = () => crypto.randomInt(100000, 999999).toString();

router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number is required" });

  const otp = generateOtp();
  otpStore.set(phone, otp);

  const params = {
    Message: `Your OTP is: ${otp}`,
    PhoneNumber: phone,
  };

  try {
    await sns.publish(params).promise();
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
});

router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  const storedOtp = otpStore.get(phone);

  if (storedOtp === otp) {
    otpStore.delete(phone);
    res.status(200).json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

module.exports = router; // Use module.exports for CommonJS
