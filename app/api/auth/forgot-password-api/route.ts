// Importing necessary modules and functions
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/auth/connectToDatabase";
import { sendEmail } from "@/helpers/auth/sendEmail";
import { createPasswordResetHTML } from "@/helpers/auth/createPasswordHTML";
import { API_URL } from "@/constants";
const { v4: uuidv4 } = require("uuid");

// POST handler function for the forgot-password API
export async function POST(req: Request) {
    // Parsing the request data to JSON
    const data = await req.json();

    // Destructuring the data object to get email
    const { email } = data;

    // Connecting to the database and getting the 'users' collection
    const collection = await connectToDatabase("users");

    // If the connection to the database fails, return a 500 status code
    if (!collection) {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to the database serve",
        });
    }

    // Checking if a user with the provided email already exists
    const filteredDocs = await collection.find({ email: email }).toArray();

    // If a user with the provided email exists, return a 401 status code
    if (filteredDocs.length === 0) {
        return NextResponse.json({
            status: 401,
            message: "User with the provided email does not exist",
        });
    }

    // Generating a unique password token using the uuidv4 function
    const passwordToken = uuidv4();

    // Create the verification HTML using the imported createVerificationHTML function
    const html = createPasswordResetHTML(
        email,
        `${API_URL}/new-password?email=${email}&token=${passwordToken}`
    );

    try {
        // Send the verification email using the imported sendEmail function
        await sendEmail(email, "Reset your password", html);
    } catch (error) {
        // If an error occurs during the email sending process, return a 500 status code
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Failed to send verification email",
        });
    }

    try {
        // Update the user's passwordToken in the database
        await collection.updateOne(
            { email: email },
            { $set: { passwordToken: passwordToken } }
        );
    } catch (error) {
        // If an error occurs during the update process, return a 500 status code
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Failed to update passwordToken in the database",
        });
    }

    // If everything goes well, return a 200 status code
    return NextResponse.json({
        status: 200,
        message: "The email has been sent successfully",
    });
}
