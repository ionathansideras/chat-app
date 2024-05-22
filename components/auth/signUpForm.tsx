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
    );
}
