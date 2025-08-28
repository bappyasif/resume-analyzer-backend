import express, { Request } from 'express';
import { geminiResumePromptForFeedback } from '../prompts';
import { model } from '../utils/genAi';

const router = express.Router();

router.post('/', async (req: Request, res: any) => {
    if (!model) {
        return res.status(500).json({ error: "Gemini model is not available." });
    }

    try {
        const { text, role } = req.body;

        if (!role) return res.status(400).json({ error: "No role provided." });

        if (!text) return res.status(400).json({ error: "No resume text provided." });

        const prompt = geminiResumePromptForFeedback(text, role);

        const result = await model?.generateContent(prompt);
        const responseText = result?.response.text();

        if (!result || !responseText) {
            console.error("No response or text from Gemini model.");
            return res.status(500).json({ error: "Failed to get a response from Gemini model." });
        }

        // Clean the responseText to remove potential markdown code block fences
        let cleanedJsonString = responseText;
        const jsonBlockMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);

        if (jsonBlockMatch && jsonBlockMatch[1]) {
            cleanedJsonString = jsonBlockMatch[1];
        } else {
            // If no markdown block is found, try to trim whitespace as a fallback
            cleanedJsonString = responseText.trim();
        }

        const parsedOutput = JSON.parse(cleanedJsonString);

        res.json({ ...parsedOutput });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gemini API error" });
    }
})

export default router;