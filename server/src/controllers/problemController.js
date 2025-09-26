
import { findSimilarProblems } from '../services/similarityService.js';
import { findProblemsWithLLM } from '../services/llmService.js';
import Problem from '../models/problemModel.js';

export async function searchProblems(req, res) {
    const { description, useLLM } = req.body;
    if (!description) return res.status(400).json({ message: 'Description required', results: [] });

    let problems;
    try {
        problems = await Problem.find({});
    } catch (err) {
        return res.status(500).json({ message: 'Database error', results: [] });
    }

    if (useLLM) {
        try {
            const results = await findProblemsWithLLM(description, problems);
            return res.json({ results, message: results.length ? '' : 'No similar problems found.' });
        } catch (err) {
            return res.status(500).json({ message: `LLM error: ${err.message}`, results: [] });
        }
    }

    const results = findSimilarProblems(description, problems);
    if (results.length === 0) {
        return res.json({ message: 'No similar problems found.', results: [] });
    }
    res.json({ results, message: '' });
}