import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_FLASH_1_5_FLASH_LITE_API_KEY;

// 1. Initialize the modern SDK client wrapper
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// 2. Structural mocking layer to protect your old router calls
const genAI = ai ? {
  getGenerativeModel: ({ model }: { model: string }) => {
    // FORCE-MIGRATE outdated 1.5 and 2.0 endpoints to the stable 2.5 baseline
    const normalizedModel = (
      model.includes("gemini-1.5") || 
      model.includes("gemini-2.0") || 
      model === "gemini-pro"
    ) ? "gemini-2.5-flash-lite" : model; 

    return {
      generateContent: async (contents: any) => {
        // Unpack configuration parameters if passed inside an object structure
        const finalContents = typeof contents === 'object' && contents.contents 
          ? contents.contents 
          : contents;

        // Route the live request down the modern SDK pipeline
        const response = await ai.models.generateContent({
          model: normalizedModel,
          contents: finalContents,
        });

        // Mimic the exact data hierarchy of the legacy SDK
        return {
          response: {
            text: () => response.text,
          }
        };
      }
    };
  }
} : null;

const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' }) : null;

console.log("🚀 GenAI legacy wrapper updated");

export { genAI, model };