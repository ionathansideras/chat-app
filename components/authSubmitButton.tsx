// Import the React library
import React from "react";

// Import the useFormStatus hook from react-dom
import { useFormStatus } from "react-dom";

// Define a functional component named AuthSubmitButton
export default function AuthSubmitButton({
    children, // children is a prop that contains the child elements of this component
}: {
    children: React.ReactNode; // Define the type of children as ReactNode
}) {
    // Use the useFormStatus hook to get the status of the form
    const status = useFormStatus();

    // If the form is pending, return a disabled button with the text "Loading..."
    if (status.pending === true) {
        return <button disabled>Loading...</button>;
    } else {
        // If the form is not pending, return a submit button with the child elements
        return <button type="submit">{children}</button>;
    }
}
