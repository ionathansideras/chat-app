// Importing necessary modules and functions
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/auth/connectToDatabase";
import { hashUserPassword } from "@/helpers/auth/hash";

// This function handles POST requests for user password reset
export async function POST(req: Request) {
    // Parsing the request data to JSON
    const data = await req.json();

    // Destructuring the data object to get email, token, and password
    const { email, token, password } = data;

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

    // If the token matches the user's token, verify the user's email
    if (filteredDocs[0].passwordToken === token) {
        // Hash the user's password
        const hashedPassword = hashUserPassword(password);

        // Update the user's verified status to true in the database
        await collection.updateOne(
            { email: email },
            {
                $set: { password: hashedPassword },
                $unset: { passwordToken: "" },
            }
        );

        // Return a 200 status code and a success message
        return NextResponse.json({
            status: 200,
            message: "Password has been updated",
        });
    }

    // If the token doesn't match the user's token, return a 401 status code
    return NextResponse.json({ status: 401, message: "Invalid token" });
}
