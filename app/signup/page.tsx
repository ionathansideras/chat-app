"use client";
import React from "react";
import { signUp } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";

export default function SignUpPage() {
    const status = useFormStatus();
    // Define the initial state
    const initialState = { message: "" };

    const [formState, formAction] = useFormState(signUp, initialState);

    return (
        <main>
            <h1>Sign Up</h1>
            <p>Create a new account</p>
            <form action={formAction}>
                <label>
                    Username
                    <input type="text" name="username" />
                </label>
                <label>
                    Email
                    <input type="email" name="email" />
                </label>
                <label>
                    Password
                    <input type="password" name="password" />
                </label>
                <label>
                    Confirm Password
                    <input type="password" name="confirmPassword" />
                </label>
                {formState?.message ? <p>{formState?.message}</p> : null}
                <button type="submit">Sign up</button>
            </form>
        </main>
    );
}
