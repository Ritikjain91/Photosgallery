import React from 'react';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <main className="flex-1">
        <Gallery />
      </main>

      {/* Subtle footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>Celebrare Frontend Pre-Screening Assignment &bull; Built with React, Vite &amp; Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;
