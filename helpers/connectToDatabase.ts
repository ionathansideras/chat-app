import { MongoClient } from "mongodb";

// Connection URL
const url = process.env.MONGODB_KEY;

if (!url) {
    throw new Error("Please define the MONGODB_KEY environment variable");
}

const client = new MongoClient(url); // Creating a new MongoDB client

// Database Name
const dbName = "chatapp";

export async function connectToDatabase(collectionName: string) {
    // Connecting to the MongoDB server
    await client.connect();

    // Selecting the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    return collection;
}
