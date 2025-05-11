// src/components/NonprofitList.jsx
function NonprofitList({ nonprofits, weight }) {
    if (!nonprofits.length) return <p>No matching nonprofits found.</p>;
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Top Recommendations</h2>
        <ul className="space-y-2">
          {nonprofits.map((n, idx) => (
            <li key={idx} className="border p-3 rounded">
              <strong>{n.name}</strong> <br />
              Category: {n.category} <br />
              Location: {n.location} <br />
              Rating: {(n.rating * weight).toFixed(1)}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default NonprofitList;
  