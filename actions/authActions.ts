"use server";
import { API_URL } from "@/constants";
import { cookies } from "next/headers";

// This function is used to sign up a new user.
export async function signUp(formData: FormData) {
    // Extracting form data
    const name = formData.get("username");
    let email = formData.get("email");
    let password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Converting email and password to string if they are not already
    if (typeof email !== "string") {
        email = String(email);
    }

    if (typeof password !== "string") {
        password = String(password);
    }

    let error = {};

    // Check if fields are not empty
    if (!name || !email || !password || !confirmPassword) {
        error = { message: "All fields are required" };
    }
    // Check if email is in a valid format
    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        error = { message: "Please enter a valid email" };
    }
    // Check if password and confirmPassword are the same
    else if (password !== confirmPassword) {
        error = { message: "Passwords do not match" };
    }
    // Check if password is at least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character
    else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            password
        )
    ) {
        error = {
            message:
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        };
    }

    // If there are any validation errors, log them and stop execution
    if (Object.keys(error).length > 0) {
        console.error(error);
        return;
    }

    // If there are no validation errors, make a POST request to the signup API
    const response = await fetch(API_URL + "/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: name,
            email: email,
            password: password,
        }),
    });
}

// This function is used to log in an existing user.
export async function logIn(formData: FormData) {
    // Extracting form data
    const email = formData.get("email");
    const password = formData.get("password");

    // Make a POST request to the login API with the user's email and password
    const response = await fetch(API_URL + "/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    // Parse the response to JSON
    const data = await response.json();

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const thirtyDays = oneDay * 30; // milliseconds in 30 days
    // create a cookie with the session token that expires in 30 days
    cookies().set("sessionToken", data.message.sessionToken, {
        expires: Date.now() + thirtyDays,
    });

    // If the status is 200, the user logged in successfully
    if (data.status === 200) {
        console.log("User logged in successfully");
    } else {
        // If the status is not 200, there was an error. Show the error message.
        console.log(data.message);
    }
}
