import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/connectToDatabase";

// This function handles POST requests for user login
export async function POST(req: Request) {
    // Parse the request body to JSON
    const data = await req.json();

    // Extract email and password from the request data
    const { sessionToken } = data;

    // Connect to the 'users' collection in the database
    const collection = await connectToDatabase("users");

    if (!collection) {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to the database serve",
        });
    }

    // Find a user document in the collection that matches the provided email
    const filteredDocs = await collection
        .find({ sessionToken: sessionToken })
        .toArray();

    // If no user is found, return a 401 status with a "User not found" message
    if (filteredDocs.length === 0) {
        return NextResponse.json({
            status: 401,
            message: "User is not validated",
        });
    }

    // If all checks pass, return a 200 status with a "Success" message
    return NextResponse.json({
        status: 200,
        message: "User is validated",
    });
}
