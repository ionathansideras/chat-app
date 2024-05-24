import { NextResponse } from "next/server";
import { verifyPassword } from "@/helpers/auth/hash";
import { connectToDatabase } from "@/helpers/auth/connectToDatabase";
import { sendEmail } from "@/helpers/auth/sendEmail";
import { createVerificationCodeHTML } from "@/helpers/auth/createVerificationCodeHTML";

// This function handles POST requests for user login
export async function POST(req: Request) {
    // Parse the request data to JSON
    const data = await req.json();

    // Extract email and password from the request data
    const { email, password } = data;

    // Connect to the 'users' collection in the database
    const collection = await connectToDatabase("users");

    // If the connection to the database fails, return a 500 status with a "Failed to connect to the database server" message
    if (!collection) {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to the database serve",
        });
    }

    // Find a user document in the collection that matches the provided email
    const filteredDocs = await collection.find({ email: email }).toArray();

    // If no user is found, return a 401 status with a "User not found" message
    if (filteredDocs.length === 0) {
        return NextResponse.json({ status: 401, message: "User not found" });
    }

    // Verify the provided password against the stored password
    const passwordIsValid = verifyPassword(filteredDocs[0].password, password);

    // If the password is not valid, return a 500 status with a "Wrong password" message
    if (!passwordIsValid) {
        return NextResponse.json({
            status: 500,
            message: "Wrong password",
        });
    }

    // If the user's email is not verified, return a 401 status with a verification message
    if (!filteredDocs[0].verified) {
        return NextResponse.json({
            status: 401,
            message: "Please verify your email address before logging in",
        });
    }

    // Generating a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000);

    //  Set the date and time for the code expiration
    const expireTime = new Date();

    // Create the verification HTML using the imported createVerificationHTML function
    const html = createVerificationCodeHTML(email, code);

    try {
        // Send the verification email using the imported sendEmail function
        await sendEmail(email, "2FA Verification Number", html);
    } catch (error) {
        // If an error occurs during the email sending process, return a 500 status code
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Failed to send verification email",
        });
    }

    try {
        // Update the user's 2fa code in the database
        await collection.updateOne(
            { email: email },
            {
                $set: {
                    verificationCode: {
                        code: code,
                        expireTime: expireTime,
                    },
                },
            }
        );
    } catch (error) {
        // If an error occurs during the update process, return a 500 status code
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Failed to add verification code to the database",
        });
    }

    // If all checks pass, return a 200 status with a "Success" message
    return NextResponse.json({
        status: 200,
        message: "Success",
    });
}
