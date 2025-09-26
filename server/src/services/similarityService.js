
export function findSimilarProblems(inputDescription, problems) {
    const input = inputDescription.trim().toLowerCase();

    const scored = problems.map(problem => {
        const desc = problem.description.toLowerCase();
        const title = problem.title.toLowerCase();

        let score = 0;
        let position = Infinity;

        if (desc.includes(input)) {
            score += 2;
            position = desc.indexOf(input);
            if (position === 0) score += 1; // Bonus for starting match
        }
        if (title.includes(input)) {
            score += 1;
            position = Math.min(position, title.indexOf(input));
            if (title.indexOf(input) === 0) score += 1; // Bonus for starting match
        }

        return { ...problem._doc ? problem._doc : problem, score, position };
    });

    return scored
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score || a.position - b.position)
        .map(({ title, difficulty, tags, description }) => ({ title, difficulty, tags, description }));
}