import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function findProblemsWithLLM(userQuery, problems) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are an expert coding interview assistant. Given the following list of problems, return the most relevant problems for the query: "${userQuery}". Respond with a JSON array of objects with title, difficulty, tags, and description.\n\nProblems:\n${JSON.stringify(problems, null, 2)}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  try {
    const jsonStart = text.indexOf('[');
    const jsonEnd = text.lastIndexOf(']');
    const jsonString = text.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch { 
    return [];
  }
}
