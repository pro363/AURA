import { GoogleGenAI, Type, Schema } from "@google/genai";
import { TransformationItem, AssetType, MOCK_ANALYSIS_TEMPLATE } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Simulates the analysis of a website. 
 * Since we cannot scrape a real URL client-side without a backend proxy,
 * we will ask Gemini to generate "De-AI" suggestions based on a 
 * hypothetical "generic AI website" content model.
 */
export const analyzeAndHumanize = async (url: string): Promise<{ items: TransformationItem[], score: number, detectedPatterns: string[] }> => {
  
  // In a real backend scenario, we would fetch the HTML here.
  // For this demo, we simulate the "Detected" content being passed to Gemini
  // to ask for a "De-AI" transformation.

  try {
    const prompt = `
      You are a senior Design Director and Copywriter. 
      I want you to simulate analyzing a generic, AI-generated SaaS landing page located at "${url}".
      
      The website suffers from:
      1. Overuse of words like "Unlock", "Unleash", "Elevate", "Synergy".
      2. Generic 3D abstract illustrations.
      3. Lack of specific value propositions.

      Generate a JSON response representing 3 specific assets that need "De-AI" transformation.
      
      For the COPY assets, provide a specific example of "AI-sounding" text and a "Human-sounding" rewrite.
      For the IMAGE assets, describe the generic image and describe a premium, human alternative.
      
      Also provide an "AI Score" (0-100) representing how artificial the site looks, and a list of detected patterns.
    `;

    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.INTEGER, description: "A score from 0 to 100 indicating how AI-generated the site looks." },
        detectedPatterns: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "List of specific AI patterns detected (e.g., 'Vague H1', 'Blue 3D Blobs')."
        },
        items: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              type: { type: Type.STRING, enum: [AssetType.COPY, AssetType.IMAGE] },
              original: { type: Type.STRING, description: "The simulated generic content found." },
              originalLabel: { type: Type.STRING, description: "Label for the original content (e.g. 'Hero Headline')." },
              suggestion: { type: Type.STRING, description: "The premium, humanized replacement." },
              suggestionLabel: { type: Type.STRING, description: "Label for the suggestion." },
              reasoning: { type: Type.STRING, description: "Why this change makes it look less like AI." },
            },
            required: ["id", "type", "original", "originalLabel", "suggestion", "suggestionLabel", "reasoning"]
          }
        }
      },
      required: ["score", "detectedPatterns", "items"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Slightly creative to invent the "detected" content
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const data = JSON.parse(text);

    // Map the response to our internal structure, adding defaults if needed
    const items: TransformationItem[] = data.items.map((item: any) => ({
      ...item,
      isApplied: true, // Default to applied for the preview
      // If it's an image type, we replace the text description with a placeholder URL for the UI
      original: item.type === AssetType.IMAGE ? 'https://picsum.photos/seed/ai/800/600?grayscale' : item.original,
      suggestion: item.type === AssetType.IMAGE ? 'https://picsum.photos/seed/human/800/600' : item.suggestion
    }));

    return {
      items: items,
      score: data.score,
      detectedPatterns: data.detectedPatterns
    };

  } catch (error) {
    console.error("Gemini Analysis Failed, falling back to template", error);
    // Fallback for demo stability if API fails
    return {
      items: MOCK_ANALYSIS_TEMPLATE,
      score: 88,
      detectedPatterns: ["Overused Buzzwords", "Generic Stock Layout", "Lack of Human Element"]
    };
  }
};