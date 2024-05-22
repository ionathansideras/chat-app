"use client";
import React from "react";
import { logIn } from "@/actions/authActions";
import { useFormState } from "react-dom";
import Link from "next/link";
import AuthSubmitButton from "@/components/authSubmitButton";

export default function LoginPage() {
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
                <br></br>
                <label>
                    Password
                    <input type="password" name="password" />
                </label>
                <br></br>
                {formState?.message ? <p>{formState?.message}</p> : null}
                <br></br>
                <AuthSubmitButton> Log In </AuthSubmitButton>
                <Link href="/signup">go to sign up</Link>
            </form>
        </main>
    );
}
