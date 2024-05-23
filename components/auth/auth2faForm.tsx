"use client";
import React from "react";
import { useFormState } from "react-dom";
import { verify2faCode } from "@/actions/authActions";

export default function Auth2faForm() {
    // Define the initial state
    const initialState = { message: "" };

    // Using the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(verify2faCode, initialState);

    return (
        <form action={formAction} className="auth-form">
            <label htmlFor="2fa-code">Your code</label>
            <input type="text" name="code" id="2fa-code" />

            <p>{formState.message}</p>
            <button className="auth-submit" type="submit">
                Submit
            </button>
        </form>
    );
}
