import React, { useState } from 'react';

const BreakdownSection = () => {
  const [company, setCompany] = useState('');
  const [goals, setGoals] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    setLoading(true);
    const prompt = `A company named ${company} wants to donate to a nonprofit. Their goals are: ${goals}.
                    Based on this, suggest one nonprofit category and a specific nonprofit they should consider, with reasoning.`;

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 200,
        }),
      });

      const data = await res.json();
      const msg = data.choices?.[0]?.message?.content || "No recommendation found.";
      setRecommendation(msg);
    } catch (err) {
      console.error(err);
      setRecommendation("Error generating recommendation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold mb-2">Breakdown: AI Recommendation</h2>
      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="border p-2 mr-2"
      />
      <input
        type="text"
        placeholder="Company Goals"
        value={goals}
        onChange={(e) => setGoals(e.target.value)}
        className="border p-2 mr-2"
      />
      <button
        onClick={getRecommendation}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Generate
      </button>
      <div className="mt-4">
        {loading ? <p>Loading...</p> : <p>{recommendation}</p>}
      </div>
    </div>
  );
};

export default BreakdownSection;
