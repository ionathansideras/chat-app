// Importing the MongoClient class from the mongodb package
import { MongoClient } from "mongodb";

// Retrieving the MongoDB connection URL from the environment variables
const url = process.env.MONGODB_KEY;

// If the MONGODB_KEY environment variable is not defined, throw an error
if (!url) {
    throw new Error("Please define the MONGODB_KEY environment variable");
}

// Creating a new MongoDB client using the connection URL
const client = new MongoClient(url);

// Defining the name of the database
const dbName = "chatapp";

// The connectToDatabase function, which connects to the MongoDB server and selects a collection
export async function connectToDatabase(collectionName: string) {
    // Connecting to the MongoDB server
    await client.connect();

    // Selecting the database
    const db = client.db(dbName);
    // Selecting the collection
    const collection = db.collection(collectionName);

    // Returning the selected collection
    return collection;
}
