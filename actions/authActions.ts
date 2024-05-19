"use server";

export async function signUp(formData: FormData) {
    const name = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    console.log("Signing up", name, email, password, confirmPassword);
}

export async function logIn(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Logging in", email, password);
}
