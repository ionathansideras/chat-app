// Importing necessary modules and functions
import { NextResponse } from "next/server";
import { hashUserPassword } from "@/helpers/hash";
import { connectToDatabase } from "@/helpers/connectToDatabase";
import { sendEmail } from "@/helpers/sendEmail";
import { createVerificationHTML } from "@/helpers/createVerificationHTML";
import { API_URL } from "@/constants";
const { v4: uuidv4 } = require("uuid");

// POST handler function
export async function POST(req: Request) {
    // Parsing the request body to JSON
    const data = await req.json();

    // Destructuring the data object to get username, email, and password
    const { username, email, password } = data;

    // Hashing the password using the imported hashUserPassword function
    const hashedPassword = hashUserPassword(password);

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
    if (filteredDocs.length > 0) {
        return NextResponse.json({
            status: 401,
            message: "A user with this email already exists",
        });
    }

    const emailToken = uuidv4();

    try {
        // If a user with the provided email doesn't exist, insert a new user into the collection
        await collection.insertOne({
            username: username,
            email: email,
            password: hashedPassword,
            verified: false,
            emailToken: emailToken,
            timestamp: new Date(),
        });
    } catch (error) {
        // If an error occurs during the insertion, return a 500 status code
        return NextResponse.json({
            status: 500,
            message: "Failed to insert user into the database",
        });
    }

    // Create the verification HTML using the imported createVerificationHTML function
    const html = createVerificationHTML(
        username,
        `${API_URL}/verify-email?email=${email}&token=${emailToken}`
    );

    try {
        // Send the verification email using the imported sendEmail function
        sendEmail(email, "Verify your email", html);
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 500,
            message: "Failed to send verification email",
        });
    }

    // If everything goes well, return a 200 status code
    return NextResponse.json({ status: 200 });
}
