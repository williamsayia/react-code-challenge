import React, { useEffect, useState } from 'react';
import Header from '../Components/Layout/Header';
import SkipList from '../Components/HomePageComponents/SkipList';

function Home() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch skip data from the API when the component mounts
  useEffect(() => {
    const fetchAllSkips = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || 'https://default-api-url.com';
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSkips(data);
      } catch (err) {
        setError('Failed to load skips. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSkips();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header component */}
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page title and description */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-customTeal mb-6 leading-tight">
            Choose Your Skip Size
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed">
            Select the skip size that best suits your needs
          </p>
        </div>
        {/* SkipList component to display skip options */}
        <SkipList skips={skips} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default Home;