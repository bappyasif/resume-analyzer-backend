import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = process.env.GEMINI_FLASH2_0_LITE_API_KEY;
const apiKey = process.env.GEMINI_FLASH_1_5_FLASH_LITE_API_KEY;

if (!apiKey) {
    console.error("CRITICAL: GEMINI_FLASH2_0_API_KEY is not set. Ensure .env.local is loaded in index.ts.");
    // You might want to prevent the route from being set up or throw an error
    // that stops the server if the API key is essential for this module.
}

// Initialize genAI only if apiKey is available
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' }) : null;

export { genAI, model };