# 🔐 Authentication Logic

This document describes the authentication logic used in this application.

## 🔍 Page Access Authentication

When a user attempts to access a page, the application performs an authentication check to determine whether the user is allowed to view the page. This process works as follows:

![Application Architecture](./public/session1.png)

1. The user navigates to a page. 🚶
2. The application sends a request to the server, including the user's `sessionToken`. 📡
3. The server receives the request and extracts the `sessionToken`. 📥
4. The server queries the database to find a document that matches the provided `sessionToken`. 🗄️
5. If a matching document is found, the server sends a response indicating that the user is authenticated. ✅
6. If no matching document is found, the server sends a response indicating that the user is not authenticated. ❌
7. The application receives the server's response. 📬
8. If the response indicates that the user is authenticated, the application allows the user to view the page. 👀
9. If the response indicates that the user is not authenticated, the application redirects the user to a different page (e.g., a login page). 🔄

This process ensures that only authenticated users with a valid token can access certain pages. The `sessionToken` should be stored securely on the client side and included in every request to the server.

## 📧 Email Verification

This application uses Nodemailer to send a verification email to the user's email address to confirm its validity. This process works as follows:

1. When a user signs up, the application generates a unique verification token. 🔑
2. The application stores the verification token in the user's document in the database. 🗄️
3. The application sends a verification email to the user's email address. The email includes a link with two query parameters: `email` and `token`. The `email` parameter is the user's email address, and the `token` parameter is the verification token. 📧

    ![Email Verification](./public/email_verification.png)

4. The user clicks the link in the verification email. 🖱️
5. The application reads the `email` and `token` query parameters from the URL. 🔍
6. The application sends a request to the server, including the `email` and `token`. 📡
7. The server queries the database to find a document that matches the provided `email` and `token`. 🗄️
8. If a matching document is found, the server marks the user as verified in the database and sends a response indicating that the email has been verified. ✅
9. If no matching document is found, the server sends a response indicating that the email could not be verified. ❌

This process ensures that the user has access to the email address they provided. If a user is not verified, they cannot access certain pages in the application.

## 🔑 Login

The login process is handled by the `POST` function in the `route.ts` file. Here's a step-by-step overview of what happens:

1. The user submits their login credentials. 📝
2. The `POST` function receives the request and parses the request data to JSON. 📨
3. The email and password are extracted from the parsed data. 🔍
4. The function connects to the 'users' collection in the database. 🗄️
5. The function checks if a user document exists in the collection that matches the provided email. 🔎
6. If the user exists, the provided password is verified against the stored password. 🔐
7. If the credentials are correct, a random 6-digit code is generated for two-factor authentication (2FA). 🎲
8. The verification HTML is created using the `createVerificationCodeHTML` function. 📝
9. An email with the 2FA code is sent to the user using the `sendEmail` function. 📧
10. The 2FA code along with its expiration date is stored in the database. 🗄️
11. A response is sent to the client. If all operations are successful, a 200 status with a "Success" message is returned. 📤

If the status is 200, the 2FA component is opened on the client side. This component will handle the second step of the authentication process, where the user is required to enter the 2FA code that was sent to their email. 🔐

## 🛡️ Two-Factor Authentication (2FA)

The 2FA process is handled by the `POST` function in the `2fa_route.ts` file. Here's a step-by-step overview of what happens:

1. The user submits the 2FA form with the received code. 📝
2. The `POST` function receives the request and parses the request data to JSON. 📨
3. The email and 2FA code are extracted from the parsed data. 🔍
4. The function connects to the 'users' collection in the database. 🗄️
5. The function checks if a user document exists in the collection that matches the provided email and 2FA code. 🔎
6. If the user exists and the 2FA code is correct, the function checks if the code has not expired. ⏰
7. If the code is valid and not expired, a session token is generated. 🎲
8. The session token is stored in the database and sent back to the client in the response. 📤

If the response is successful, the client sets the session token in the user's browser for 7 days. This session token gives the user access to the application. If the response is not successful, the user is prompted to try again. 🔐
