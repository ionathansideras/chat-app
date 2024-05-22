"use client";

// Importing the forgotPassword action from authActions
import { forgotPassword } from "@/actions/authActions";
// Importing the useFormState hook from react-dom
import { useFormState } from "react-dom";

// The ForgotPasswordForm component
export default function ForgotPasswordForm() {
    // Define the initial state
    const initialState = { message: "" };

    // Using the useFormState hook to manage the form state
    // The forgotPassword action is passed as the first argument to useFormState
    const [formState, formAction] = useFormState(forgotPassword, initialState);

    return (
        // The form for requesting a password reset
        <form action={formAction}>
            <label>Email</label>
            <input type="email" name="email" />
            {/* Displaying a message if there is one in the form state */}
            {formState.message && <p>{formState.message}</p>}
            {/* The submit button for the form */}
            <button type="submit">Send</button>
        </form>
    );
}
