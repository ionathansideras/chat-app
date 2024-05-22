"use client";
import React from "react";
import { signUp } from "@/actions/authActions";
import { useFormState } from "react-dom";
import Link from "next/link";
import AuthSubmitButton from "@/components/authSubmitButton";

export default function SignUpPage() {
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
                <br></br>
                <label>
                    Email
                    <input type="email" name="email" />
                </label>
                <br></br>
                <label>
                    Password
                    <input type="password" name="password" />
                </label>
                <br></br>
                <label>
                    Confirm Password
                    <input type="password" name="confirmPassword" />
                </label>
                <br></br>
                {formState?.message ? <p>{formState?.message}</p> : null}
                <br></br>
                <AuthSubmitButton> Sign Up </AuthSubmitButton>
                <Link href="/login">go to login</Link>
            </form>
        </main>
    );
}
