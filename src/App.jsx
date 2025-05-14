import React, { useState, useEffect } from 'react';
import { getFortune } from './FortuneService';
import confetti from 'canvas-confetti';
import cookieImg from './assets/cookie.png';
import brokenCookieImg from './assets/broken-cookie.png';
import crackSound from './assets/crack.mp3';


function App() {
  const [fortune, setFortune] = useState(null);
  const [jar, setJar] = useState([]);
  const [showJar, setShowJar] = useState(false);
  const [cracked, setCracked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('cookieJar')) || [];
    setJar(saved);
  }, []);

  const saveToJar = (fortuneObj) => {
    const updated = [fortuneObj, ...jar];
    setJar(updated);
    localStorage.setItem('cookieJar', JSON.stringify(updated));
  };

  const handleCrack = () => {
    const result = getFortune();
    setCracked(true);
    setFortune(result);
    launchConfetti();
    saveToJar({ text: result.text, timestamp: new Date().toISOString() });
    const audio = new Audio(crackSound);
    audio.volume = 0.5; 
    audio.play().catch(err => console.error('Audio play error:', err));
  };
  

  const toggleFavorite = (idx) => {
    const updated = [...jar];
    updated[idx].favorite = !updated[idx].favorite;
    setJar(updated);
    localStorage.setItem('cookieJar', JSON.stringify(updated));
  };

  const launchConfetti = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.3 },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 px-4 bg-gradient-to-br from-yellow-50 via-orange-100 to-yellow-200 text-gray-800 font-sans overflow-x-hidden">
      <h1 className="text-5xl sm:text-6xl font-bold mb-8 tracking-tight text-center">
        🥠 Fortune Cookie
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mb-10 z-10">
        {!showJar && (
          <button onClick={handleCrack} className="glow-btn">
            Crack the Cookie
          </button>
        )}
        <button onClick={() => setShowJar(!showJar)} className="glow-btn bg-white text-orange-600 hover:bg-yellow-200">
          {showJar ? 'Hide Cookie Jar' : '🍪 View Cookie Jar'}
        </button>
      </div>

      {!showJar && (
        <>
          <div className="relative mb-8">
          <img
  src={cracked ? brokenCookieImg : cookieImg}
  alt="Fortune Cookie"
  className="w-52 sm:w-64 h-auto transition-transform ease-in-out duration-700 float-cookie drop-shadow-lg"
/>

          </div>

          {fortune && (
            <div className="bg-white px-8 py-6 rounded-xl shadow-xl max-w-xl text-center border-t-4 border-orange-400 animate-fade-in">
              <p className="fortune-type text-purple-700 font-semibold">
                "{fortune.text}"
              </p>
            </div>
          )}
        </>
      )}

      {showJar && (
        <div className="grid gap-6 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 px-4">
          {jar.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              Your cookie jar is empty!
            </p>
          )}
          {jar.map((item, i) => (
            <div key={i} className="glass-card relative">
              <p className="text-base text-gray-700 italic mb-2">"{item.text}"</p>
              <p className="text-xs text-gray-400">— {item.category}</p>
              <button
                onClick={() => toggleFavorite(i)}
                className="absolute top-2 right-2 text-xl transition-transform hover:scale-125"
              >
                {item.favorite ? '❤️' : '🤍'}
              </button>
            </div>
          ))}
        </div>
      )}

      <footer className="mt-20 text-sm text-gray-500 text-center z-10">
        Made with <span className="text-red-500">♥</span> by{' '}
        <a
          href="https://github.com/Tharunya07"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Tharunya07
        </a>
      </footer>
    </div>
  );
}

export default App;
