"use client";
import React from "react";
// Importing the logIn action from authActions
import { logIn } from "@/actions/authActions";
// Importing the useFormState hook from react-dom
import { useFormState } from "react-dom";
// Importing the Link component from next/link
import Link from "next/link";
// Importing the AuthSubmitButton component
import AuthSubmitButton from "@/components/auth/authSubmitButton";

// The LogInForm component
export default function LogInForm() {
    // Define the initial state
    const initialState = { message: "" };

    // Using the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(logIn, initialState);

    return (
        // The form for logging in
        <form action={formAction}>
            <label>
                Email
                <input type="email" name="email" />
            </label>
            <br></br>
            <label>
                Password
                <input type="password" name="password" />
            </label>
            <br></br>
            {/* Displaying a message if there is one in the form state */}
            {formState?.message ? <p>{formState?.message}</p> : null}
            <br></br>
            {/* The submit button for the form */}
            <AuthSubmitButton> Log In </AuthSubmitButton>
            {/* Links to the sign up and forgot password pages */}
            <Link href="/signup">go to sign up</Link>
            <Link href="/forgot-password">forgot password</Link>
        </form>
    );
}
