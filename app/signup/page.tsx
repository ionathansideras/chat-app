import React from "react";
import { signUp } from "@/actions/authActions";

export default function SignUpPage() {
    return (
        <main>
            <h1>Sign Up</h1>
            <p>Create a new account</p>
            <form action={signUp}>
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
                <button type="submit">Sign up</button>
            </form>
        </main>
    );
}
