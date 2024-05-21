// Importing necessary modules and functions
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/constants";

// This is the main component for the Verify Email page
export default function VerifyEmailPage() {
    // Using the useSearchParams hook to get the URL parameters
    const searchParams = useSearchParams();
    // Extracting the 'email' and 'token' parameters from the URL
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    // Setting up a state variable for the message to be displayed
    const [message, setMessage] = useState("");

    // Using the useEffect hook to run code when the component mounts
    useEffect(() => {
        // Defining an async function that will make the API call
        const verifyEmail = async () => {
            try {
                // Making a POST request to the verify-email-token endpoint
                const response = await fetch(
                    `${API_URL}/api/verify-email-token`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, token }),
                    }
                );

                // Parsing the response to JSON
                const data = await response.json();

                // Setting the message state variable to the message from the response
                setMessage(data.message);
            } catch (error) {
                // If an error occurs, log it to the console
                console.error(error);
            }
        };

        // Calling the verifyEmail function
        verifyEmail();
    }, []); // The empty array means this useEffect will only run once, when the component mounts

    // Rendering the component
    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}
