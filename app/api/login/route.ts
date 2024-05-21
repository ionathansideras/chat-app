import { NextResponse } from "next/server";
import { verifyPassword } from "@/helpers/hash";
import { connectToDatabase } from "@/helpers/connectToDatabase";
const { v4: uuidv4 } = require("uuid");

// This function handles POST requests for user login
export async function POST(req: Request) {
    // Parse the request body to JSON
    const data = await req.json();

    // Extract email and password from the request data
    const { email, password } = data;

    // Connect to the 'users' collection in the database
    const collection = await connectToDatabase("users");

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

    const newSessionToken = uuidv4();

    await collection.updateOne(
        { email: email },
        { $set: { sessionToken: newSessionToken } }
    );

    // If all checks pass, return a 200 status with a "Success" message
    return NextResponse.json({
        status: 200,
        message: {
            sessionToken: newSessionToken,
        },
    });
}
