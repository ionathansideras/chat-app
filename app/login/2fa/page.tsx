"use client";
import React from "react";
import { useFormState } from "react-dom";
import { verify2faCode } from "@/actions/authActions";

export default function Auth2faPage() {
    // Define the initial state
    const initialState = { message: "" };

    // Using the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(verify2faCode, initialState);

    return (
        <form action={formAction}>
            <label>Your code</label>
            <input type="text" name="code" />

            <p>{formState.message}</p>
            <button type="submit">Submit</button>
        </form>
    );
}
