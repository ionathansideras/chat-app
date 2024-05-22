import { redirect } from "next/navigation";
import { isUserLoggedIn } from "@/helpers/isUserLoggedIn";
import { logOut } from "@/actions/authActions";
import { cookies } from "next/headers";

export default async function MessagesPage() {
    const user = await isUserLoggedIn();

    console.log(user);

    if (!user) {
        redirect("/login");
    }

    return (
        <>
            <div>Messages</div>
            <form action={logOut}>
                <button type="submit">Logout</button>
            </form>
        </>
    );
}
