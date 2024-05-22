import LogInForm from "@/components/auth/logInForm";

// Metadata for the page
export const metadata = {
    title: "Log In | ChatHub",
    description: "Log in to your ChatHub account.",
    keywords: "ChatHub, Log In, Chat, Global Communication",
    author: "ChatHub Team",
};

// The login page component
export default function LoginPage() {
    return (
        <main>
            <h1>Login</h1>
            <p>Log in to your account</p>
            <LogInForm />
        </main>
    );
}
