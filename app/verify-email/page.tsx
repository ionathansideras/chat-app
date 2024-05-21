"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/constants";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/verify-email-token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, token }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessage(data.message);
            });
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
}
