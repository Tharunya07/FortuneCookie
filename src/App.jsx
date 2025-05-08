import React, { useState } from 'react';
import { getFortune } from './FortuneService';
import crackSound from './assets/crack.mp3';
import cookieImg from './assets/cookie.png';
import brokenCookieImg from './assets/broken-cookie.png';

function App() {
  const [fortune, setFortune] = useState(null);
  const [cracked, setCracked] = useState(false);
  const crackAudio = new Audio(crackSound);

  const handleCrack = () => {
    crackAudio.play();
    setCracked(true);
    setTimeout(() => {
      setFortune(getFortune());
    }, 1000);
  };

  const handleReset = () => {
    setCracked(false);
    setFortune(null);
  };

  const tweetFortune = () => {
    const tweet = encodeURIComponent(`"${fortune.text}" — ${fortune.category}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweet}`, '_blank');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 px-4 text-gray-800">
      <h1 className="text-4xl font-extrabold text-center text-orange-800 mb-4 drop-shadow">
        🥠 Fortune Cookie Simulator
      </h1>

      <button onClick={handleCrack}>
        <img
          src={cracked ? brokenCookieImg : cookieImg}
          alt="Fortune Cookie"
          className="w-48 h-48 transition-transform hover:scale-105 drop-shadow-lg"
        />
      </button>

      {fortune ? (
        <div className="mt-8 text-center space-y-3">
          <p className="text-2xl italic text-purple-700">"{fortune.text}"</p>
          <p className="text-sm text-gray-500 font-medium">— {fortune.category}</p>

          <div className="flex gap-4 mt-4 justify-center">
            <button
              onClick={handleReset}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow"
            >
              Crack another
            </button>
            <button
              onClick={tweetFortune}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow"
            >
              Tweet 🐦
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-lg text-gray-600 animate-pulse">Tap the cookie to reveal your fortune!</p>
      )}

      <footer className="mt-12 text-sm text-gray-600">
        Made with <span className="text-red-500">♥</span> by{' '}
        <a
          href="https://github.com/Tharunya07"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Tharunya07
        </a>
      </footer>
    </div>
  );
}

export default App;
