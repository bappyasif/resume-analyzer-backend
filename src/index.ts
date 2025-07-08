import dotenv from 'dotenv';
import path from 'path'; // Import path for robustly locating .env.local

// --- Load environment variables ---
// Call dotenv.config() as early as possible.
// If you are using a .env.local file, specify its path.
// This ensures that process.env is populated before other modules are loaded.
const envPath = path.resolve(process.cwd(), '.env.local'); // Assumes .env.local is in your project root
const dotenvResult = dotenv.config({ path: envPath });

if (dotenvResult.error) {
    // If .env.local is optional, this can be a warning.
    // If it's critical, you might want to throw an error or log a more severe message.
    console.warn(`Warning: Could not load .env.local file from ${envPath}. Error: ${dotenvResult.error.message}`);
    console.log("Attempting to load default .env file instead or relying on system environment variables.");
    dotenv.config(); // Attempt to load default .env if .env.local fails or is not found
}

import express, { Request, Response } from 'express';

import cors from 'cors';

import resumeAnalysisRouter from '../routes/resume-analysis';

import resumeFeedbackRouter from '../routes/resume-feedback';


const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'] // Allow requests from your frontend
}));

app.use(express.json());

app.use('/resume-analysis', resumeAnalysisRouter);
app.use('/resume-feedback', resumeFeedbackRouter);

const port = process.env.PORT || 3003;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});