import sharp from 'sharp';

/**
 * Processes an image file: resizes to 500x500 and converts to base64
 * @param file - The image file buffer or base64 string
 * @returns Base64 encoded string of the processed image
 */
export async function processProfileImage(file: Buffer | string): Promise<string> {
  try {
    let buffer: Buffer;

    // Convert input to buffer if it's a base64 string
    if (typeof file === 'string') {
      const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
    } else {
      buffer = file;
    }

    // Resize image to 500x500 and convert to JPEG format
    const processedBuffer = await sharp(buffer)
      .resize(500, 500, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({
        quality: 85,
        progressive: true,
      })
      .toBuffer();

    // Convert to base64 string with data URI prefix
    const base64String = `data:image/jpeg;base64,${processedBuffer.toString('base64')}`;

    return base64String;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error('Failed to process image');
  }
}


