import { findSimilarProblems } from '../services/similarityService.js';

export function searchProblems(req, res) {
    const { description } = req.body;
    if (!description) return res.status(400).json({ message: 'Description required', results: [] });

    const results = findSimilarProblems(description);
    if (results.length === 0) {
        return res.json({ message: 'No similar problems found.', results: [] });
    }
    res.json({ results, message: '' });
}