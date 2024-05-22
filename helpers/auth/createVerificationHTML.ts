export function createVerificationHTML(
    username: string,
    verificationLink: string
) {
    return `
<html>
<head>
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            width: 80%;
            margin: auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: white;
            background-color: #4CAF50;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello, ${username}</h2>
        <p>Thank you for registering. Please verify your email address to activate your account.</p>
        <p>Click the button below to verify your email address:</p>
        <a href=${verificationLink} class="button">Verify Email Address</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best,</p>
        <p>Your Team</p>
    </div>
</body>
</html>`;
}
