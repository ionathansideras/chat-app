"use client";
import React from "react";
// Importing the createNewPassword action from authActions
import { createNewPassword } from "@/actions/authActions";
// Importing the useFormState hook from react-dom
import { useFormState } from "react-dom";
// Importing the useSearchParams hook from next/navigation
import { useSearchParams } from "next/navigation";
// Importing the Suspense component from react
import { Suspense } from "react";

// The NewPasswordPage component
export default function NewPasswordPage() {
    return (
        // Using Suspense to handle the loading state while the FormPassword component is being fetched
        <Suspense>
            <FormPassword />
        </Suspense>
    );
}

// The FormPassword component
function FormPassword() {
    // Using the useSearchParams hook to get the URL parameters
    const searchParams = useSearchParams();
    // Extracting the 'email' and 'token' parameters from the URL
    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    // Defining the initial state for the form
    const initialState = { message: "" };
    // Using the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(
        // Binding the email and token parameters to the createNewPassword action
        createNewPassword.bind(null, email, token),
        initialState
    );

    return (
        <>
            <h1>New Password Page</h1>
            {/* The form for creating a new password */}
            <form action={formAction}>
                <label>New Password</label>
                <input type="password" name="password" />
                <label>Confirm new Password</label>
                <input type="password" name="confirmPassword" />
                {/* Displaying a message if there is one in the form state */}
                {formState.message && <p>{formState.message}</p>}
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
