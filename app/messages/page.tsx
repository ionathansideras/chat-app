import { redirect } from "next/navigation";
import { isUserLoggedIn } from "@/helpers/auth/isUserLoggedIn";
import { logOut } from "@/actions/authActions";
import { API_URL } from "@/constants";

export default async function MessagesPage() {
    const user = await isUserLoggedIn();

    if (!user) {
        redirect("/login");
    }

    const response = await fetch(`${API_URL}/api/auth/messages`);
    const data = await response.json();

    const messages = data.message.messages;
    return (
        <>
            <h1>This page is on development</h1>
            <div>
                {messages
                    ? messages.map((message: string) => {
                          return <div key={message}>{message}</div>;
                      })
                    : "loading..."}
            </div>

            <form action={logOut}>
                <button type="submit">Logout</button>
            </form>
        </>
    );
}
