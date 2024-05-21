// Import the nodemailer module
const nodemailer = require("nodemailer");

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail", // Specify the email service
    host: "smtp.ethereal.email", // Specify the SMTP server
    port: 587, // Specify the SMTP port
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.EMAIL_SENDER, // Your email address
        pass: process.env.EMAIL_SENDER_APP_PASSWORD, // Your password (or app password if 2FA is enabled)
    },
});

// Define an asynchronous function to send an email
export async function sendEmail(to: string, subject: string, html: string) {
    try {
        // Send an email with the defined transport object
        await transporter.sendMail({
            from: '"noreply"  <iona8ansideras@gmail.com>', // Sender address
            to, // List of receivers
            subject, // Subject line
            text: "Hello there", // Plain text body
            html, // HTML body
        });
    } catch (error) {
        console.error(error);
    }
}
