import { NextResponse } from "next/server";
import { hashUserPassword } from "@/helpers/hash";
import { connectToDatabase } from "@/helpers/connectToDatabase";

// POST handler function
export async function POST(req: Request) {
    // Parsing the request body to JSON
    const data = await req.json();

    // Destructuring the data object to get username, email, and password
    const { username, email, password } = data;

    // Hashing the password
    const hashedPassword = hashUserPassword(password);

    // Connecting to the database
    const collection = await connectToDatabase("users");

    if (!collection) {
        return NextResponse.json({
            status: 500,
            message: "Failed to connect to the database serve",
        });
    }

    const filteredDocs = await collection.find({ email: email }).toArray();

    if (filteredDocs.length > 0) {
        return NextResponse.json({
            status: 401,
            message: "A user with this email already exists",
        });
    }

    // Inserting a new document into the collection
    await collection.insertOne({
        username: username,
        email: email,
        password: hashedPassword,
        verified: false,
    });

    // Sending a response back to the client
    return NextResponse.json({ status: 200 });
}
