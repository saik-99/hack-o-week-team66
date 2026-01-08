import { GoogleGenAI } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;

const getAIClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const getGeminiResponse = async (userQuery: string): Promise<string> => {
  try {
    const client = getAIClient();
    
    // Using gemini-3-flash-preview for basic text tasks as per guidelines
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userQuery,
      config: {
        systemInstruction: GEMINI_SYSTEM_INSTRUCTION,
        temperature: 0.7, // Slight creativity for polite fallbacks
      }
    });

    return response.text || "I'm sorry, I couldn't process that request right now. Please try again later.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the server. Please check your connection or try again later.";
  }
};
