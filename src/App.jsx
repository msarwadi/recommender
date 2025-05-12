import React, { useState } from 'react';
import CompanyForm from './CompanyForm';
import SearchSection from './SearchSection';
import BreakdownSection from './components/BreakdownSection';

function App() {
  const [recommendation, setRecommendation] = useState('');

  const handleCompanySubmit = async (companyInfo) => {
    const res = await fetch('/api/recommendation', {
      method: 'POST',
      body: JSON.stringify(companyInfo),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setRecommendation(data.recommendation);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Corporate Donation Helper</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-2">🧠 AI-Powered Breakdown</h2>
        <CompanyForm onSubmit={handleCompanySubmit} />
        {recommendation && (
          <div className="mt-4 bg-green-100 p-4 rounded">
            <h3 className="font-semibold">Suggested Nonprofit:</h3>
            <p>{recommendation}</p>
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
