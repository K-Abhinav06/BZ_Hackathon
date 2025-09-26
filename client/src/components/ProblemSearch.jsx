import React, { useState } from 'react';
import { useEffect } from 'react';

function ProblemSearch() {
  const [description, setDescription] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('Searching...');
    setResults([]);
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setResults(data?.results || []);
      setMessage(data?.message || (data?.results?.length ? '' : 'No similar problems found.'));
    } catch (err) {
      setMessage('Error searching problems.', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
      <form onSubmit={handleSearch} className="flex flex-col gap-4">
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe your problem..."
          rows={4}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none text-base"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      <div className="mt-6">
        {message && <p className="text-gray-700 mb-4">{message}</p>}
        <ul className={`space-y-4 ${results.length ? 'h-96' : ''} overflow-y-auto`}>
          {results?.map((problem, idx) => (
            <li key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">{problem?.title || 'Untitled'}</span>
                <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">{problem?.difficulty || 'Unknown'}</span>
              </div>
              <div>
                <p className="mt-2 text-gray-800">{problem?.description || 'No description available.'}</p>
              </div>
              <div className="mt-2 text-gray-600 text-sm">
                Tags: {problem?.tags?.length ? problem.tags.join(', ') : 'None'}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProblemSearch;
