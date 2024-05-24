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
// Importing the BackgroundElement component
import BackgroundElement from "@/components/backgroundElement";
// Importing the AuthSubmitButton component
import AuthSubmitButton from "@/components/auth/authSubmitButton";

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
    const initialState = { message: "", status: 0 };
    // Using the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(
        // Binding the email and token parameters to the createNewPassword action
        createNewPassword.bind(null, email, token),
        initialState
    );

    console.log(formState);

    return (
        <main className="auth-container">
            <section>
                <h1>New Password Page</h1>
                <p>Set a new password for your account</p>
                {/* The form for creating a new password */}
                <form action={formAction} className="auth-form">
                    <label htmlFor="new-password-input">New Password</label>
                    <input
                        type="password"
                        name="password"
                        id="new-password-input"
                    />

                    <label htmlFor="new-confirm-password-input">
                        Confirm new Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="new-confirm-password-input"
                    />
                    {/* Displaying a message if there is one in the form state */}
                    {formState.status === 200 ? (
                        <p className="auth-success">{formState.message}</p>
                    ) : (
                        <p className="auth-error">{formState.message}</p>
                    )}
                    <AuthSubmitButton> Set New Password </AuthSubmitButton>
                </form>
                <BackgroundElement />
            </section>
        </main>
    );
}
