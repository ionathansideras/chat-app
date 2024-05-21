// Importing necessary modules and functions
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/connectToDatabase";

// This function handles POST requests for user login
export async function POST(req: Request) {
    // Parsing the request body to JSON
    const data = await req.json();

    // Destructuring the data object to get email and token
    const { email, token } = data;

    // Connecting to the database and getting the 'users' collection
    const collection = await connectToDatabase("users");

    // If the connection to the database fails, return a 500 status code
    if (!collection) {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to the database serve",
        });
    }

    // Checking if a user with the provided email exists
    const filteredDocs = await collection.find({ email: email }).toArray();

    // If a user with the provided email doesn't exist, return a 401 status code
    if (filteredDocs.length === 0) {
        return NextResponse.json({ status: 401, message: "User not found" });
    }

    // If the user's email is already verified, return a 200 status code
    if (filteredDocs[0].verified) {
        return NextResponse.json({
            status: 200,
            message: "Email already verified",
        });
    }

    // If the token matches the user's token, verify the user's email
    if (filteredDocs[0].emailToken === token) {
        // Update the user's verified status to true in the database
        await collection.updateOne(
            { email: email },
            { $set: { verified: true }, $unset: { emailToken: "" } }
        );

        // Return a 200 status code and a success message
        return NextResponse.json({ status: 200, message: "Email verified" });
    }

    // If the token doesn't match the user's token, return a 401 status code
    return NextResponse.json({ status: 401, message: "Invalid token" });
}
