/**
 * Validates image file type and size
 * @param mimeType - The MIME type of the file
 * @param sizeInBytes - The size of the file in bytes
 * @returns true if valid, throws error if invalid
 */
export function validateImageFile(mimeType: string, sizeInBytes: number): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSizeInBytes = 4 * 1024 * 1024; // 4MB

    if (!allowedTypes.includes(mimeType)) {
        throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF images are allowed.');
    }

    if (sizeInBytes > maxSizeInBytes) {
        throw new Error('File size exceeds 4MB limit.');
    }

    return true;
}
