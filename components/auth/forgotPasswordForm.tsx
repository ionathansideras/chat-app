"use client";

// Importing the forgotPassword action from authActions
import { forgotPassword } from "@/actions/authActions";
// Importing the useFormState hook from react-dom
import { useFormState } from "react-dom";
// Importing the Link component from next/link
import Link from "next/link";
// Importing the AuthSubmitButton component
import AuthSubmitButton from "@/components/auth/authSubmitButton";

// The ForgotPasswordForm component
export default function ForgotPasswordForm() {
    // Define the initial state
    const initialState = { message: "", status: 0 };

    // Using the useFormState hook to manage the form state
    // The forgotPassword action is passed as the first argument to useFormState
    const [formState, formAction] = useFormState(forgotPassword, initialState);

    console.log(formState);

    return (
        // The form for requesting a password reset
        <form action={formAction} className="auth-form">
            <label htmlFor="forgot-password-input">Email</label>
            <input type="email" name="email" id="forgot-password-input" />
            {/* Displaying a message if there is one in the form state */}
            {formState?.status == 200 ? (
                <p className="auth-message-success">{formState.message}</p>
            ) : (
                <p className="auth-error">{formState.message}</p>
            )}
            {/* The submit button for the form */}
            <AuthSubmitButton> Send </AuthSubmitButton>
            {/* Link to the login page */}
            <Link href="/login">Go to login</Link>
        </form>
    );
}
