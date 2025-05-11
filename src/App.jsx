// src/App.jsx
import { useState, useEffect } from 'react';
import NonprofitList from './components/NonprofitList';
import './index.css';

const roles = {
  CEO: 3,
  "CSR Manager": 2,
  "Marketing Lead": 1
};

const causes = [
  'Education',
  'Health',
  'Environment',
  'Human Rights'
];

function App() {
  const [role, setRole] = useState('CEO');
  const [cause, setCause] = useState('Education');
  const [nonprofits, setNonprofits] = useState([]);

  useEffect(() => {
    fetch('/nonprofits.json')
      .then(res => res.json())
      .then(data => setNonprofits(data));
  }, []);

  const filtered = nonprofits.filter(n => n.category === cause);

  return (
    <div className="p-6 font-sans max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nonprofit Recommender</h1>

      <label className="block mb-2">Select your role:</label>
      <select value={role} onChange={e => setRole(e.target.value)} className="mb-4 p-2 border">
        {Object.keys(roles).map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      <label className="block mb-2">Preferred cause:</label>
      <select value={cause} onChange={e => setCause(e.target.value)} className="mb-4 p-2 border">
        {causes.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <NonprofitList nonprofits={filtered} weight={roles[role]} />
    </div>
  );
}

export default App;
