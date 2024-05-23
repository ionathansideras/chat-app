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

// The login page component
export default function LoginPage() {
    // Define the initial state
    const initialState = { message: "" };

    // Using the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(logIn, initialState);

    return (
        <main className="auth-container">
            <section>
                <h1>Login</h1>
                <p>Log in to your account</p>
                <form action={formAction} className="auth-form">
                    <label htmlFor="login-email-input">Email</label>
                    <input type="email" name="email" id="login-email-input" />

                    <label htmlFor="login-password-input">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="login-password-input"
                    />
                    {/* Displaying a message if there is one in the form state */}
                    {formState?.message ? <p>{formState?.message}</p> : null}
                    {/* The submit button for the form */}
                    <AuthSubmitButton> Log In </AuthSubmitButton>
                    {/* Links to the sign up and forgot password pages */}
                    <div className="auth-redirect">
                        <Link href="/signup">Go to sign up</Link>
                        <Link href="/forgot-password">New password</Link>
                    </div>
                </form>
                {formState?.message === "Success" ? <Auth2faForm /> : null}
                <BackgroundElement />
            </section>
        </main>
    );
}
