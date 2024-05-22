import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/auth/connectToDatabase";

// This function handles POST requests for user validation
export async function POST(req: Request) {
    // Parse the request body to JSON
    const data = await req.json();

    // Extract the session token from the request body
    const { sessionToken } = data;

    // If no session token is provided, return a 400 status with a "Session token is required" message
    if (!sessionToken) {
        return NextResponse.json({
            status: 400,
            message: "Session token is required",
        });
    }

    // Connect to the 'users' collection in the database
    const collection = await connectToDatabase("users");

    // If the connection to the database fails, return a 500 status with a "Failed to connect to the database server" message
    if (!collection) {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to the database serve",
        });
    }

    // Find a user document in the collection that matches the provided session token
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
