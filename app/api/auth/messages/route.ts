import { NextResponse } from "next/server";
import { connectToDatabase } from "@/helpers/auth/connectToDatabase";

// This function handles GET requests
export async function GET() {
    // Connect to the 'users' collection in the database
    const collection = await connectToDatabase("messages");

    if (!collection) {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to the database serve",
        });
    }

    // Find a user document in the collection that matches the provided email
    const filteredDocs = await collection.find({ mode: "sample" }).toArray();

    const messages = filteredDocs[0].messages;

    // If all checks pass, return a 200 status with a "Success" message
    return NextResponse.json({
        status: 200,
        message: {
            messages,
        },
    });
}
