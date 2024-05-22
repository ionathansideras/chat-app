import { ThemeSwitch } from "@/components/themeSwitch";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <ThemeSwitch />
            <div className="lorem">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                tempora, tempore reprehenderit eligendi dolorem nulla, quam,
                tenetur sunt temporibus neque quo nesciunt quod asperiores.
                Doloremque neque sapiente repudiandae numquam accusamus!
            </div>

            <Link href="/signup">Sign up</Link>
            <br></br>
            <Link href="/login">Log in</Link>
        </main>
    );
}
