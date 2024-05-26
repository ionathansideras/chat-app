import AuthHeader from "@/components/auth/authHeader";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <div style={{ margin: "10vh" }}>
                <Link href="/signup">Sign up</Link>
                <br></br>
                <Link href="/login">Log in</Link>
            </div>
        </>
    );
}
