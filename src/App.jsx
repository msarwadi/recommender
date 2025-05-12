import React, { useEffect, useState } from 'react';

const App = () => {
  const [nonprofits, setNonprofits] = useState([]);
  const [loading, setLoading] = useState(true);

  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  useEffect(() => {
    const fetchNonprofits = async () => {
      const url = new URL("https://api.getchange.io/api/v1/nonprofits");
      url.searchParams.append("public_key", PUBLIC_KEY);
      url.searchParams.append("limit", "20");
      // You can include multiple categories here if you'd like:
      url.searchParams.append("categories[]", "education");
      url.searchParams.append("categories[]", "healthcare");

      try {
        const res = await fetch(url);
        const data = await res.json();
        setNonprofits(data.nonprofits || []); // Ensure nonprofits key exists
      } catch (error) {
        console.error("Error fetching nonprofits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNonprofits();
  }, [PUBLIC_KEY]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Nonprofits</h1>
      {loading ? (
        <p>Loading nonprofits...</p>
      ) : (
        <ul className="space-y-4">
          {nonprofits.map((np) => (
            <li key={np.ein} className="border p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{np.name}</h2>
              <p className="text-sm">{np.mission || "No mission statement available."}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;