// Importing the SignUpForm component
import SignUpForm from "@/components/auth/signUpForm";
import BackgroundElement from "@/components/backgroundElement";

// Metadata for the sign up page
export const metadata = {
    // The title of the page
    title: "Sign Up | ChatHub",
    // A brief description of the page
    description:
        "Create a new account on ChatHub and start chatting with people from all around the world.",
    // Keywords for SEO
    keywords: "ChatHub, Sign Up, Chat, Global Communication, Create Account",
    // The author of the page
    author: "ChatHub Team",
};

// The SignUpPage component
export default function SignUpPage() {
    return (
        // The main tag is used to wrap the main content of the page
        <main className="auth-container">
            <section>
                <h1>Sign Up</h1>
                <p>Create a new account</p>
                <SignUpForm />
                <BackgroundElement />
            </section>
        </main>
    );
}
