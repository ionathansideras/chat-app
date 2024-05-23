// Importing necessary modules and functions
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/auth/connectToDatabase";
const { v4: uuidv4 } = require("uuid");

// POST handler function for the send-2fa-email API
export async function POST(req: Request) {
    // Parsing the request data to JSON
    const data = await req.json();

    // Destructuring the data object to get email
    const { email, code } = data;

    // Check if the code is not empty
    if (!code) {
        return NextResponse.json({
            status: 400,
            message: "Code is required",
        });
    }

    // Check if the email is not empty
    if (!email) {
        return NextResponse.json({
            status: 400,
            message: "Something went wrong. Please try to login again",
        });
    }

    // Connecting to the database and getting the 'users' collection
    const collection = await connectToDatabase("users");

    // If the connection to the database fails, return a 500 status code
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

    // if 5 minutes have passed from the expireTime of the verification code, return a 401 status with a "Code expired" message
    // calculate the difference between the current date and the expireTime
    const currentTime = new Date();
    const expireTime = new Date(filteredDocs[0].verificationCode.expireTime);

    // if the difference is greater than 5 minutes, return a 401 status with a "Code expired" message
    if (currentTime.getTime() - expireTime.getTime() > 300000) {
        return NextResponse.json({
            status: 401,
            message: "Code expired",
        });
    }

    // stored code to str
    const storedCode = String(filteredDocs[0].verificationCode.code);

    // Check if the provided code matches the stored code
    if (storedCode !== code) {
        return NextResponse.json({
            status: 401,
            message: "Invalid code",
        });
    }

    // Generate a new session token using the uuidv4 function
    const newSessionToken = uuidv4();

    try {
        // Update the user's session token and remove the verificationCode in the database
        await collection.updateOne(
            { email: email },
            {
                $set: { sessionToken: newSessionToken },
                $unset: { verificationCode: "" },
            }
        );
    } catch (error) {
        // If an error occurs during the session token update, return a 500 status with a "Failed to update session token" message
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Failed to update session token",
        });
    }

    // If everything goes well, return a 200 status code
    return NextResponse.json({
        status: 200,
        message: {
            sessionToken: newSessionToken,
        },
    });
}
