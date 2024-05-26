"use client";
// Importing the logIn action from authActions
import { logIn } from "@/actions/authActions";
// Importing the useFormState hook from react-dom
import { useFormState } from "react-dom";
// Importing the Link component from next/link
import Link from "next/link";
// Importing the AuthSubmitButton component
import AuthSubmitButton from "@/components/auth/authSubmitButton";
// Importing the Auth2faForm component
import Auth2faForm from "@/components/auth/auth2faForm";
// Importing the BackgroundElement component
import BackgroundElement from "@/components/backgroundElement";
// Importing the Image component from next/image
import Image from "next/image";
// Importing the eyeOpen and eyeClosed images
import eyeOpen from "@/assets/eye-open.png";
import eyeClosed from "@/assets/eye-closed.png";
// Importing the email image
import email from "@/assets/email.png";
// Importing the useState hook from react
import { useState } from "react";

// The login page component
export default function LoginPage() {
    // Define the initial state
    const initialState = { message: "" };

    // Using the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(logIn, initialState);

    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="auth-container">
            <section>
                <h1>Login</h1>
                <p>Log in to your account</p>
                <form action={formAction} className="auth-form">
                    <label htmlFor="login-email-input">Email</label>
                    <div>
                        <input
                            type="email"
                            name="email"
                            id="login-email-input"
                        />
                        <Image
                            src={email}
                            alt="Email"
                            width={30}
                            height={30}
                            priority
                        />
                    </div>

                    <label htmlFor="login-password-input">Password</label>
                    <div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="login-password-input"
                        />
                        <Image
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-eye"
                            src={showPassword ? eyeClosed : eyeOpen}
                            alt="Password"
                            width={30}
                            height={30}
                            priority
                        />
                    </div>

                    {/* Displaying a message if there is one in the form state */}
                    {formState?.message && formState?.message !== "Success" ? (
                        <p className="auth-error">{formState?.message}</p>
                    ) : null}
                    {/* The submit button for the form */}
                    <AuthSubmitButton> Log In </AuthSubmitButton>
                    {/* Links to the sign up and forgot password pages */}
                    <nav className="auth-redirect">
                        <Link href="/signup">Go to sign up</Link>
                        <Link href="/forgot-password">New password</Link>
                    </nav>
                </form>
                {formState?.message === "Success" ? <Auth2faForm /> : null}
                <BackgroundElement />
            </section>
        </main>
    );
}
