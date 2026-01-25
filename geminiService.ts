
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const polishMessage = async (rawMessage: string, context: { studentName: string, facultyName: string, purpose: string }): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Rewrite this message from a student (${context.studentName}) to a faculty member (${context.facultyName}) to be more professional, polite, and clear. Purpose: ${context.purpose}. Raw message: "${rawMessage}"`,
      config: {
        systemInstruction: "You are a professional academic advisor helping students communicate professionally with their professors.",
      }
    });
    return response.text || rawMessage;
  } catch (error) {
    console.error("Gemini polish error:", error);
    return rawMessage;
  }
};

export const getSmartSuggestions = async (facultyInterests: string[], currentPrompt: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Given a professor's interests: ${facultyInterests.join(', ')}, suggest 3 professional ice-breakers or conversation starters for a student to use in an email regarding: ${currentPrompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [];
  }
};
