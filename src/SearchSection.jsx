// src/SearchSection.jsx
import React, { useState } from 'react';

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const fetchResults = async (term, currentPage) => {
    const url = new URL("https://api.getchange.io/api/v1/nonprofits");
    url.searchParams.append("public_key", PUBLIC_KEY);
    url.searchParams.append("search_term", term);
    url.searchParams.append("page", currentPage);
    url.searchParams.append("limit", 10); // 10 per page

    const res = await fetch(url);
    const data = await res.json();
    setResults(data.nonprofits || []);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResults(searchTerm, 1);
    setPage(1);
  };

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    fetchResults(searchTerm, newPage);
  };

  const prevPage = () => {
    const newPage = page - 1;
    if (newPage > 0) {
      setPage(newPage);
      fetchResults(searchTerm, newPage);
    }
  };

  return (
    <div className="my-6">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          className="p-2 w-1/2 border"
          placeholder="Search nonprofits by name or EIN..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">Search</button>
      </form>

      <ul>
        {results.map((np) => (
          <li key={np.ein} className="p-4 border mb-2 rounded">
            <strong>{np.name}</strong>
            <p>{np.mission}</p>
          </li>
        ))}
      </ul>

      <div className="flex space-x-4 mt-4">
        <button onClick={prevPage} disabled={page === 1}>Previous</button>
        <span>Page {page}</span>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default SearchSection;
