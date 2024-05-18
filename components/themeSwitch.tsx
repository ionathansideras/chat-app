"use client";
import { useTheme } from "next-themes"; // Importing useTheme hook from next-themes
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from react

export const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme(); // Using useTheme hook to get the current theme and a function to set the theme
    const [mounted, setMounted] = useState(false); // State variable to check if the component has mounted

    // useEffect hook to set the mounted state to true after the first render
    useEffect(() => setMounted(true), []);

    // If the component has not mounted, return null
    if (!mounted) return null;

    // Function to handle the color change
    const handleColorChange = () => {
        // If the current theme is light, set it to dark. Otherwise, set it to light.
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    // Render a button that toggles the theme when clicked
    return (
        <div>
            <button onClick={handleColorChange}>
                {theme === "light" ? "Dark" : "Light"} Mode
            </button>
        </div>
    );
};
