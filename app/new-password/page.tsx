"use client";
import React from "react";
import { createNewPassword } from "@/actions/authActions";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function NewPasswordPage() {
    return (
        <Suspense>
            <FormPassword />
        </Suspense>
    );
}
function FormPassword() {
    // Using the useSearchParams hook to get the URL parameters
    const searchParams = useSearchParams();
    // Extracting the 'email' and 'token' parameters from the URL
    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";

    const initialState = { message: "" };
    const [formState, formAction] = useFormState(
        createNewPassword.bind(null, email, token),
        initialState
    );

    return (
        <>
            <h1>New Password Page</h1>
            <form action={formAction}>
                <label>New Password</label>
                <input type="password" name="password" />
                <label>Confirm new Password</label>
                <input type="password" name="confirmPassword" />
                {formState.message && <p>{formState.message}</p>}
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
