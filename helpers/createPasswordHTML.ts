export function createPasswordResetHTML(email: string, resetLink: string) {
    return `
<html>
<head>
    <title>Password Reset</title>
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
        <h2>Hello, ${email}</h2>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <a href=${resetLink} class="button">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best,</p>
        <p>Your Team</p>
    </div>
</body>
</html>`;
}
