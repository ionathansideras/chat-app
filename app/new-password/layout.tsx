export const metadata = {
    title: "Forgot Password | ChatHub",
    description: "Enter your email to reset your password.",
};

export default function ForgotPasswordLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
