// Import the React library
import React from "react";

// Import the useFormStatus hook from react-dom
import { useFormStatus } from "react-dom";

// Define a functional component named AuthSubmitButton
export default function AuthSubmitButton({
    children, // children is a prop that contains the child elements of this component
    isDisabled, // isDisabled is a prop that determines if the button is disabled
}: {
    children: React.ReactNode; // Define the type of children as ReactNode
    isDisabled?: boolean; // Define isDisabled as an optional boolean prop
}) {
    // Use the useFormStatus hook to get the status of the form
    const status = useFormStatus();

    // If the form is pending, return a disabled button with the text "Loading..."
    if (status.pending === true) {
        return (
            <button className="auth-loading-button" disabled>
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </button>
        );
    } else if (isDisabled) {
        // If the form is not pending and the button is disabled, return a disabled button with the child elements
        return (
            <button className="auth-submit disabled" disabled>
                {children}
            </button>
        );
    } else {
        // If the form is not pending, return a submit button with the child elements
        return (
            <button className="auth-submit" type="submit">
                {children}
            </button>
        );
    }
}
