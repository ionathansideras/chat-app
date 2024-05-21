"use client";
import React from "react";
import { logIn } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginPage() {
    const status = useFormStatus();
    // Define the initial state
    const initialState = { message: "" };

    const [formState, formAction] = useFormState(logIn, initialState);

    return (
        <main>
            <h1>Login</h1>
            <p>Log in to your account</p>
            <form action={formAction}>
                <label>
                    Email
                    <input type="email" name="email" />
                </label>
                <label>
                    Password
                    <input type="password" name="password" />
                </label>
                {formState?.message ? <p>{formState?.message}</p> : null}
                <button type="submit">Log in</button>
            </form>
        </main>
    );
}
