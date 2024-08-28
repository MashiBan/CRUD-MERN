import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [heartColor, setHeartColor] = useState('red');
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeartColor(prevColor => (prevColor === 'red' ? 'pink' : 'red'));
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setJoke(data.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJoke();
  }, []);

  return (
    <footer>
      <p>Made with <span style={{ color: heartColor }}>&hearts;</span> by WhisperTales</p>
      <div>
        {loading ? (
          <p>Loading joke...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p>{joke}</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
