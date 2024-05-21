import { redirect } from "next/navigation";
import { isUserLoggedIn } from "@/helpers/isUserLoggedIn";

export default async function MessagesPage() {
    const user = await isUserLoggedIn();

    if (!user) {
        redirect("/login");
    }

    return <div>Messages</div>;
}
