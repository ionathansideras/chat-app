"use client";

import { signUp } from "@/actions/authActions";
import { useFormState } from "react-dom";
import Link from "next/link";
import AuthSubmitButton from "@/components/auth/authSubmitButton";
import Image from "next/image";
import eyeOpen from "@/assets/eye-open.png";
import eyeClosed from "@/assets/eye-closed.png";
import email from "@/assets/email.png";
import user from "@/assets/user.png";
import password from "@/assets/key.png";
import { useState } from "react";

export default function SignUpForm() {
    // Define the initial state
    const initialState = { message: "" };

    const [showPassword, setShowPassword] = useState(true);

    // Use the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(signUp, initialState);

    return (
        <form action={formAction} className="auth-form">
            <label htmlFor="signup-username-input">Username</label>
            <div>
                <input type="text" name="username" id="signup-username-input" />
                <Image
                    src={user}
                    alt="Username"
                    width={30}
                    height={30}
                    priority
                />
            </div>

            <label htmlFor="signup-email-input">Email</label>
            <div>
                <input type="email" name="email" id="signup-email-input" />
                <Image
                    src={email}
                    alt="Email"
                    width={30}
                    height={30}
                    priority
                />
            </div>

            <label htmlFor="signup-password-input">Password</label>
            <div>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="signup-password-input"
                />
                <Image
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-eye"
                    src={showPassword ? eyeOpen : eyeClosed}
                    alt="Password"
                    width={30}
                    height={30}
                    priority
                />
            </div>

            <label htmlFor="signup-verify-password-input">
                Confirm Password
            </label>
            <div>
                <input
                    type="password"
                    name="confirmPassword"
                    id="signup-verify-password-input"
                />
                <Image
                    src={password}
                    alt="Password"
                    width={30}
                    height={30}
                    priority
                />
            </div>

            {formState?.message ? (
                <p className="auth-error">{formState?.message}</p>
            ) : null}
            <AuthSubmitButton> Sign Up </AuthSubmitButton>
            <Link className="auh-one-redirect" href="/login">
                Go to login
            </Link>
        </form>
    );
}
