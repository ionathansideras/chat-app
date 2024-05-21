"use client";
// Importing necessary modules and functions
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/constants";

// This is the main component for the Verify Email page
export default function VerifyEmailPage() {
    // The component is wrapped in a Suspense component from React
    // Suspense allows you to "wait" for some code to load and declaratively specify a loading state (like a loading spinner)
    // In this case, while the VerifyEmail component is loading, the fallback will be rendered, which is a div with the text "Loading..."
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* The VerifyEmail component. This is the component that will be lazily loaded. */}
            <VerifyEmail />
        </Suspense>
    );
}

// This is the main component for the Verify Email page
function VerifyEmail() {
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
