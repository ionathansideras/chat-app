import { redirect } from "next/navigation";
import { isUserLoggedIn } from "@/helpers/isUserLoggedIn";
import { logOut } from "@/actions/authActions";
import { API_URL } from "@/constants";

export default async function MessagesPage() {
    const user = await isUserLoggedIn();

    console.log(user);

    if (!user) {
        redirect("/login");
    }

    const response = await fetch(`${API_URL}/api/messages`);
    const data = await response.json();

    const messages = data.message.messages;
    console.log(messages);
    return (
        <>
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
