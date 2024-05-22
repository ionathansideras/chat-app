import crypto from "node:crypto";

// This function hashes a user's password using a salt
export function hashUserPassword(password: string) {
    // Generate a random salt
    const salt = crypto.randomBytes(16).toString("hex");

    // Hash the password using the salt
    const hashedPassword = crypto.scryptSync(password, salt, 64);

    // Return the hashed password and salt as a string
    return hashedPassword.toString("hex") + ":" + salt;
}

// This function verifies a supplied password against a stored password
export function verifyPassword(
    storedPassword: string,
    suppliedPassword: string
) {
    // Split the stored password into the hashed password and the salt
    const [hashedPassword, salt] = storedPassword.split(":");

    // Convert the hashed password to a buffer
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");

    // Hash the supplied password using the stored salt
    const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);

    // Compare the hashed supplied password to the stored hashed password
    // using a timing safe comparison
    return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
