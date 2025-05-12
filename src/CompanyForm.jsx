// CompanyForm.jsx
import React, { useState } from 'react';

const CompanyForm = ({ onSubmit }) => {
  const [companyData, setCompanyData] = useState({
    name: '',
    industry: '',
    goals: '',
    location: '',
  });

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(companyData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded">
      <input name="name" placeholder="Company Name" onChange={handleChange} className="w-full p-2" />
      <input name="industry" placeholder="Industry" onChange={handleChange} className="w-full p-2" />
      <input name="location" placeholder="Headquarters Location" onChange={handleChange} className="w-full p-2" />
      <textarea name="goals" placeholder="Company Goals or Causes" onChange={handleChange} className="w-full p-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Generate Recommendation</button>
    </form>
  );
};

export default CompanyForm;
