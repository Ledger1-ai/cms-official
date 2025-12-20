import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

// In production, this MUST be set in environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
    throw new Error("ENCRYPTION_KEY is not defined in environment variables");
}

function getKey(): Buffer {
    // Ensure the key is exactly 32 bytes using SHA-256
    return crypto.createHash('sha256').update(String(ENCRYPTION_KEY)).digest();
}

/**
 * Encrypts a string using AES-256-GCM.
 * Returns format: iv:authTag:encrypted
 */
export function encrypt(text: string): string {
    if (!text) return text;
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag().toString('hex');

        return `${iv.toString('hex')}:${authTag}:${encrypted}`;
    } catch (error) {
        console.error("Encryption failed:", error);
        return text; // Fallback to plaintext if critical failure (though this is risky)
    }
}

/**
 * Decrypts a string using AES-256-GCM.
 * Handles legacy plaintext fallback.
 */
export function decrypt(text: string): string {
    if (!text) return text;

    const parts = text.split(':');
    // Robust check: must have 3 parts and IV must be 32 hex chars (16 bytes)
    if (parts.length !== 3) {
        // Assume legacy plaintext
        return text;
    }

    const [ivHex, authTagHex, encryptedHex] = parts;

    try {
        const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), Buffer.from(ivHex, 'hex'));
        decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

        let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.warn("Decryption failed or invalid ciphertext. Returning original.");
        // Return original text to handle potential edge cases or legacy data misinterpretation
        return text;
    }
}
