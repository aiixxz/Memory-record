
import { GoogleGenAI } from "@google/genai";
import { Photo } from "../types";

export const generateCurationNote = async (photos: Photo[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const photoContext = photos.map(p => `${p.title}: ${p.description} (Shot on ${p.cameraSettings?.film})`).join('; ');
  
  const prompt = `
    You are a professional art curator for a high-end photography gallery. 
    Analyze the following list of photos and write a short, poetic "Curator's Note" (2-3 sentences) in a nostalgic, film-inspired tone.
    The note should describe the overall "vibe" or emotional resonance of this collection.
    
    Photos: ${photoContext}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "A collection of moments suspended in time, where light meets memory in a chemical embrace.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The grain of these moments tells a story of light and time, captured through the lens of a wandering soul.";
  }
};
