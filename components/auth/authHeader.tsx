import React from "react";
import { ThemeSwitch } from "@/components/themeSwitch";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/chathub.png";

export default function AuthHeader() {
    return (
        <header className="header">
            <Link href="/">
                <Image src={logo} alt="Logo" priority width={100} height={50} />
            </Link>
            <ThemeSwitch />
        </header>
    );
}
