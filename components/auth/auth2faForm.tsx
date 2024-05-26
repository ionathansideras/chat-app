"use client";
import { useEffect, useRef, useState } from "react";

import { useFormState } from "react-dom";
import { verify2faCode } from "@/actions/authActions";
import AuthSubmitButton from "@/components/auth/authSubmitButton";
import MyTimer from "@/components/auth/timer2fa";
import Image from "next/image";
import password from "@/assets/key.png";

export default function Auth2faForm() {
    // Define the initial state
    const initialState = { message: "" };

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const coverRef = useRef<HTMLDivElement | null>(null);

    const [isExpired, setIsExpired] = useState(false);

    const time = new Date();
    time.setSeconds(time.getSeconds() + 300); // 5 minutes timer

    // Using the useFormState hook to manage the form state
    const [formState, formAction] = useFormState(verify2faCode, initialState);

    useEffect(() => {
        // add active class to ref
        setTimeout(() => {
            if (sectionRef.current && coverRef.current) {
                sectionRef.current.classList.add("active");
                coverRef.current.classList.add("active");
            }
        }, 100);
    }, []);

    return (
        <>
            <section ref={sectionRef} className="section-2fa">
                <h2>2FA</h2>
                <p>Enter the code that we send you on your Email</p>
                <MyTimer
                    expiryTimestamp={time}
                    isExpired={isExpired}
                    setIsExpired={setIsExpired}
                />
                <form action={formAction} className="auth-form">
                    <label htmlFor="2fa-code">Your code</label>
                    <div>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="2fa-code"
                        />
                        <Image
                            src={password}
                            alt="2fa-code"
                            width={30}
                            height={30}
                        />
                    </div>

                    {formState.message && (
                        <p className="auth-error">{formState.message}</p>
                    )}
                    <AuthSubmitButton isDisabled={isExpired}>
                        Verify
                    </AuthSubmitButton>
                </form>
            </section>
            <span ref={coverRef} className="auth-2fa-cover"></span>
        </>
    );
}
