
import { GoogleGenAI } from "@google/genai";

export const generateImage = async (prompt: string): Promise<string> => {
  // API key is automatically sourced from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
      return imageUrl;
    } else {
      throw new Error('No images were generated.');
    }
  } catch (error) {
    console.error('Error generating image with Gemini API:', error);
    if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`);
    }
    throw new Error('An unknown API error occurred.');
  }
};
