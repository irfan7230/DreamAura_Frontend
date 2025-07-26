import React, { useState, useEffect } from 'react';

const FantasyDreamWorld = () => {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prevPulse) => (prevPulse + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold">Fantasy Dream World</h2>
      <div className="relative h-64 bg-gradient-to-r from-purple-500 to-blue-500 rounded-md overflow-hidden">
        <div
          className="absolute bottom-4 right-4 w-24 h-24 rounded-full bg-transparent flex items-center justify-center"
          style={{
            boxShadow: `0 0 20px 10px rgba(0, 0, 0, 0.5), 0 0 10px 5px rgba(0, 0, 0, 0.2)`,
          }}
        >
          <div
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-gold-500 animate-pulse"
            style={{
              filter: `blur(${pulse}px)`,
              boxShadow: `inset 0 0 10px 5px rgba(255, 255, 255, 0.3)`,
            }}
          />
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full bg-transparent"
            style={{
              boxShadow: `0 0 20px 10px rgba(255, 255, 255, 0.1), 0 0 10px 5px rgba(255, 255, 255, 0.05)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FantasyDreamWorld;