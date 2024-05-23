// we add a layout for the login page to set the metadata for the login page
// because the login page is a client-side rendered page and we can't set the metadata for it
// so the layout will be used to set the metadata for the login page

export const metadata = {
    title: "Log In | ChatHub",
    description: "Log in to your ChatHub account and start chatting.",
    author: "ChatHub Team",
};

export default function LogInLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
