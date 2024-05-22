"use client";
import React from "react";
import { forgotPassword } from "@/actions/authActions";
import { useFormState } from "react-dom";

export default function ForgotPasswordPage() {
    // Define the initial state
    const initialState = { message: "" };

    const [formState, formAction] = useFormState(forgotPassword, initialState);

    return (
        <>
            <h1>Password Email Page</h1>
            <form action={formAction}>
                <label>Email</label>
                <input type="email" name="email" />
                {formState.message && <p>{formState.message}</p>}
                <button type="submit">Send</button>
            </form>
        </>
    );
}
