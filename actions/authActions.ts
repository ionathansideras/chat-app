"use server";
import { API_URL } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FormState } from "@/types/authTypes";

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

    // Converting email to string if it is not already
    if (typeof email !== "string") {
        email = String(email);
    }

    // make the password a string if it is not already
    if (typeof password !== "string") {
        password = String(password);
    }

    // Defining an error object
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
    const response = await fetch(API_URL + "/api/auth/signup", {
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
    let email = formData.get("email");
    const password = formData.get("password");

    // Check if fields are not empty
    if (!email || !password) {
        return { message: "All fields are required" };
    }

    // Make a POST request to the login API with the user's email and password
    const response = await fetch(API_URL + "/api/auth/login", {
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

    // make email a string if it is not already
    if (typeof email !== "string") {
        email = String(email);
    }

    // create a cookie with the user's email
    cookies().set("email", email);

    // If the status is 200, the user logged in successfully
    if (data.status !== 200) {
        return { message: data.message };
    } else {
        return { message: "Success" };
    }
}

// This function is used to log out a user.
export async function logOut() {
    // Remove the session token cookie
    cookies().delete("sessionToken");
    // Remove the email cookie
    cookies().delete("email");
    // Redirect the user to the login page
    redirect("/login");
}

// This function is used to send a password reset email to a user.
export async function forgotPassword(
    prevFormState: FormState,
    formData: FormData
): Promise<FormState> {
    // Extracting form data
    const email = formData.get("email");

    // Check if email is not empty
    if (!email) {
        return { message: "Email is required", status: 400 };
    }

    // Make a POST request to the forgot password API with the user's email
    const response = await fetch(API_URL + "/api/auth/forgot-password-api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
    });

    // Parse the response to JSON
    const data = await response.json();

    // return the message from the response
    return { message: data.message, status: data.status };
}

// This function is used to create a new password for a user.
export async function createNewPassword(
    email: string,
    token: string,
    prevFormState: FormState,
    formData: FormData
): Promise<FormState> {
    // Extracting form data
    let password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    // Check if fields are not empty
    if (!password || !confirmPassword) {
        return { message: "All fields are required" };
    }

    // Check if email and token are not empty
    if (!email || !token) {
        return { message: "Something went wrong please try again" };
    }

    // make the password a string if it is not already
    if (typeof password !== "string") {
        password = String(password);
    }

    // Check if password is at least 8 characters long, contains at least one uppercase letter, one lowercase letter, one number, and one special character
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

    // Check if password and confirmPassword are the same
    if (password !== confirmPassword) {
        return { message: "Passwords do not match" };
    }

    // Make a POST request to the create new password API with the user's email, token, and new password
    const response = await fetch(API_URL + "/api/auth/create-new-password", {
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

    // Parse the response to JSON
    const data = await response.json();

    return { message: data.message, status: data.status };
}

// this function is to verify the 2fa code
export async function verify2faCode(
    prevFormState: FormState,
    formData: FormData
): Promise<FormState> {
    // Extracting form data
    let code = formData.get("code");

    // make code a string if it is not already
    if (typeof code !== "string") {
        code = String(code);
    }

    // Check if code is not empty
    if (!code) {
        return { message: "Code is required" };
    }

    // max length of the code is 6
    if (code.length !== 6) {
        return { message: "Code must be 6 characters long" };
    }

    // get the user's email from the cookie
    const email = cookies().get("email");

    // Make a POST request to the verify 2fa code API with the user's code
    const response = await fetch(API_URL + "/api/auth/verify-2fa-code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email?.value,
            code: code,
        }),
    });

    // Parse the response to JSON
    const data = await response.json();

    // If the status is 200, the code is valid
    if (data.status !== 200) {
        return { message: data.message };
    } else {
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = oneDay * 7;

        cookies().set("sessionToken", data.message.sessionToken, {
            expires: Date.now() + oneWeek,
        });
        redirect("/messages");
    }
}
