import { useTimer } from "react-timer-hook";
import { useState, useEffect } from "react";

export default function MyTimer({
    expiryTimestamp,
    isExpired,
    setIsExpired,
}: {
    expiryTimestamp: Date;
    isExpired: boolean;
    setIsExpired: (value: boolean) => void;
}) {
    const { seconds, minutes } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn("onExpire called"),
    });

    useEffect(() => {
        if (minutes === 0 && seconds === 0) {
            setIsExpired(true);
        }
    }, [minutes, seconds]);

    return (
        <div style={{ textAlign: "center" }}>
            <div
                className="auth-timer"
                style={{ color: isExpired ? "#dc3545" : "rgb(118, 246, 98)" }}
            >
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            {isExpired && (
                <p className="auth-timer-error">
                    Code is now expired, please try to log in again
                </p>
            )}
        </div>
    );
}
