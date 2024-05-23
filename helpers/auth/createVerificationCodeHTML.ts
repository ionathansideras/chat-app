export function createVerificationCodeHTML(
    email: string,
    verificationCode: number
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
        .code {
            display: inline-block;
            padding: 10px 20px;
            color: #333;
            background-color: #f9f9f9;
            text-decoration: none;
            border-radius: 5px;
            border: 1px solid #ddd;
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello, ${email}</h2>
        <p>Enter the following verification code in the application:</p>
        <p class="code">${verificationCode}</p>
        <p>This code will expire in 5 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best,</p>
        <p>Your Team</p>
    </div>
</body>
</html>`;
}
