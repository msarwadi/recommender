import React, { useState } from 'react';
import CompanyForm from './CompanyForm';
import SearchSection from './SearchSection';
import ReactMarkdown from 'react-markdown';

function App() {
  // Create an OpenAI instance using Vite env variable
  //console.log(import.meta.env.VITE_OPENAI_API_KEY) // ✅ log to confirm the key is available

  /*
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // Required for frontend use
  });
  */
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCompanySubmit = async (companyInfo) => {
    const { name, industry, goals, location } = companyInfo;
    const prompt = `
      A company named ${name} in the ${industry} industry based in ${location} wants to support nonprofits.
      Their goals or causes are: ${goals}.
      Based on this, suggest one nonprofit category and a specific nonprofit they should consider, with reasoning.
      List the reasoning and also provide a percentage match with each nonprofit they they should consider based on the match of their goals`;

    setLoading(true);
    setRecommendation('No recommendation yet...');

    try {
      const url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" + GEMINI_API_KEY;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await res.json();

      if (data.candidates) {
        const result = data.candidates[0].content.parts[0].text;
        setRecommendation(result);
      } else {
        console.error('Gemini API error:', data);
        setRecommendation('⚠️ Failed to get a recommendation.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setRecommendation('⚠️ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Corporate Donation Helper</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">🧠 AI-Powered Breakdown</h2>
        <CompanyForm onSubmit={handleCompanySubmit} />
        {loading && <p className="text-gray-500 mt-2">Generating recommendation...</p>}
        {recommendation && (
          <div className="mt-4 bg-green-100 p-4 rounded">
            <h3 className="font-semibold">Suggested Nonprofit:</h3>
            <ReactMarkdown>{recommendation}</ReactMarkdown>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🔎 Search for Nonprofits</h2>
        <SearchSection />
      </section>
    </div>
  );
}

export default App;
