"use client";

import { signUp } from "@/actions/authActions";
import { useFormState } from "react-dom";
import Link from "next/link";
import AuthSubmitButton from "@/components/auth/authSubmitButton";

export default function SignUpForm() {
    // Define the initial state
    const initialState = { message: "" };

    // Use the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(signUp, initialState);

    return (
        <form action={formAction} className="auth-form">
            <label htmlFor="signup-username-input">Username</label>
            <input type="text" name="username" id="signup-username-input" />

            <label htmlFor="signup-email-input">Email</label>
            <input type="email" name="email" id="signup-email-input" />

            <label htmlFor="signup-password-input">Password</label>
            <input type="password" name="password" id="signup-password-input" />

            <label htmlFor="signup-verify-password-input">
                Confirm Password
            </label>
            <input
                type="password"
                name="confirmPassword"
                className="signup-verify-password-input"
            />
            {formState?.message ? <p>{formState?.message}</p> : null}
            <AuthSubmitButton> Sign Up </AuthSubmitButton>
            <Link className="auh-one-redirect" href="/login">
                Go to login
            </Link>
        </form>
    );
}
