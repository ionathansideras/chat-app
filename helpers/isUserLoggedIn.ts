// Import the cookies function from the next/headers module
import { cookies } from "next/headers";
// Import the API_URL constant from the constants module
import { API_URL } from "@/constants";

// Define an asynchronous function to check if the user is logged in
export async function isUserLoggedIn() {
    // Get a reference to the cookie store
    const cookieStore = cookies();
    // Get the session token from the cookie store
    const sessionToken = cookieStore.get("sessionToken");

    if (!sessionToken) {
        return false;
    }

    // Send a POST request to the validate-user endpoint of the API
    // The body of the request is a JSON string that contains the session token
    const response = await fetch(`${API_URL}/api/validate-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sessionToken: sessionToken?.value,
        }),
    });

    // Parse the response as JSON
    const data = await response.json();

    // If the status property of the data is 200, return true, otherwise return false
    return data.status === 200;
}
