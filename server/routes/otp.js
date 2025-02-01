const express = require('express');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');
const router = express.Router();

// In-memory storage for OTPs (for simplicity)
let otpStore = {};

// Function to send SMS message
async function sendSMSMessage(sns, params) {
    const command = new PublishCommand(params);
    return await sns.send(command);
}

// Helper function to validate and format phone number
function formatPhoneNumber(phone) {
    // Remove all non-numeric characters
    phone = phone.replace(/\D/g, '');

    // Ensure the phone number is 10 digits long
    if (phone.length === 10) {
        return `+91${phone}`; // Add India country code (+91) if it's a valid 10-digit number
    } else {
        throw new Error('Invalid phone number format. Please provide a valid 10-digit phone number.');
    }
}

// Route to send OTP
router.post('/send-otp', async (req, res) => {
    const { phone } = req.body; // Get phone number from request body

    try {
        const formattedPhone = formatPhoneNumber(phone); // Format the phone number with country code
        const otp = Math.random().toString().substring(2, 8); // Generate a 6-digit OTP

        console.log(`Sending OTP: ${otp} to phone number: ${formattedPhone}`); // Log OTP and phone number to terminal

        // Store OTP temporarily in memory (you can use a database in real applications)
        otpStore[formattedPhone] = otp;

        // Define parameters for SNS PublishCommand
        const params = {
            Message: `Your OTP code is: ${otp}`,
            PhoneNumber: formattedPhone, // Use the formatted phone number with country code
            MessageAttributes: {
                'AWS.SNS.SMS.SenderID': {
                    'DataType': 'String',
                    'StringValue': 'OTPService'
                }
            }
        };

        // Create SNS client
        const sns = new SNSClient({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY
            }
        });

        await sendSMSMessage(sns, params); // Send OTP via SNS
        res.status(200).json({ message: 'OTP sent successfully' }); // Respond with success
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send OTP. ' + error.message }); // Handle errors
    }
});

// Route to verify OTP
router.post('/verify-otp', (req, res) => {
    const { phone, otp } = req.body; // Get phone number and OTP from request body

    try {
        const formattedPhone = formatPhoneNumber(phone); // Format the phone number with country code

        // Check if the OTP entered by the user matches the stored OTP
        if (otpStore[formattedPhone] && otpStore[formattedPhone] === otp) {
            // OTP is valid
            delete otpStore[formattedPhone]; // Remove the OTP after it's verified
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            // Invalid OTP
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle phone number formatting errors
    }
});

module.exports = router;
