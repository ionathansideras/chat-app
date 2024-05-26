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
// Importing the Image component from next/image
import Image from "next/image";
// Importing the eyeOpen and eyeClosed images
import eyeOpen from "@/assets/eye-open.png";
import eyeClosed from "@/assets/eye-closed.png";
// Importing the password image
import password from "@/assets/key.png";
// Importing the useState hook from react
import { useState } from "react";

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

    // Using the useState hook to manage the showPassword state
    const [showPassword, setShowPassword] = useState(true);

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
                    <div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="new-password-input"
                        />
                        <Image
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-eye"
                            src={showPassword ? eyeOpen : eyeClosed}
                            alt="Password"
                            width={30}
                            height={30}
                            priority
                        />
                    </div>

                    <label htmlFor="new-password-confirm">
                        Confirm Password
                    </label>
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="new-password-confirm"
                        />
                        <Image
                            src={password}
                            alt="Password"
                            width={30}
                            height={30}
                            priority
                        />
                    </div>
                    {/* Displaying a message if there is one in the form state */}
                    {formState.status === 200 ? (
                        <p className="auth-message-success">
                            {formState.message}
                        </p>
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
