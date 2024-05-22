"use server";
import { API_URL } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormState } from "@/types/authTypes";
import exp from "constants";

// This function is used to sign up a new user.
export async function signUp(
    prevFormState: FormState,
    formData: FormData
): Promise<FormState> {
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
        return error;
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

    // Parse the response to JSON
    const data = await response.json();

    // If the status is 200, the user signed up successfully
    if (data.status !== 200) {
        // If the status is not 200, there was an error. Show the error message.
        return { message: data.message };
    } else {
        redirect("/login");
    }
}

// This function is used to log in an existing user.
export async function logIn(
    prevFormState: FormState,
    formData: FormData
): Promise<FormState> {
    // Extracting form data
    const email = formData.get("email");
    const password = formData.get("password");

    // Check if fields are not empty
    if (!email || !password) {
        return { message: "All fields are required" };
    }

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
    if (data.status !== 200) {
        return { message: data.message };
    } else {
        redirect("/messages");
    }
}

// This function is used to log out a user.
export async function logOut() {
    // Remove the session token cookie
    cookies().delete("sessionToken");
    redirect("/login");
}

export async function forgotPassword(
    prevFormState: FormState,
    formData: FormData
): Promise<FormState> {
    const email = formData.get("email");

    if (!email) {
        return { message: "Email is required" };
    }

    const response = await fetch(API_URL + "/api/forgot-password-api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
    });

    const data = await response.json();

    return { message: data.message };
}

// This function is used to create a new password for a user.
export async function createNewPassword(
    email: string,
    token: string,
    prevFormState: FormState,
    formData: FormData
): Promise<FormState> {
    let password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!password || !confirmPassword) {
        return { message: "All fields are required" };
    }

    if (!email || !token) {
        return { message: "something went wrong please try again" };
    }

    // make the password a string if it is not already
    if (typeof password !== "string") {
        password = String(password);
    }

    if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            password
        )
    ) {
        return {
            message:
                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        };
    }

    if (password !== confirmPassword) {
        return { message: "Passwords do not match" };
    }

    const response = await fetch(API_URL + "/api/create-new-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            token: token,
            password: password,
        }),
    });

    const data = await response.json();

    return { message: data.message };
}
