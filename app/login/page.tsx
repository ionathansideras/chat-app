import React from "react";
import { logIn } from "@/actions/authActions";

export default function LoginPage() {
    return (
        <main>
            <h1>Login</h1>
            <p>Log in to your account</p>
            <form action={logIn}>
                <label>
                    Email
                    <input type="email" name="email" />
                </label>
                <label>
                    Password
                    <input type="password" name="password" />
                </label>
                <button type="submit">Log in</button>
            </form>
        </main>
    );
}
