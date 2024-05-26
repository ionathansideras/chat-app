import ForgotPasswordForm from "@/components/auth/forgotPasswordForm";
import BackgroundElement from "@/components/backgroundElement";

export const metadata = {
    title: "Forgot Password | ChatHub",
    description: "Enter your email to reset your password.",
};

export default function ForgotPasswordPage() {
    return (
        <main className="auth-container">
            <section>
                <h1>Password Email Page</h1>
                <p>Enter your email to reset your password</p>
                <ForgotPasswordForm />
                <BackgroundElement />
            </section>
        </main>
    );
}
