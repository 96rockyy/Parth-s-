
import React from 'react';
import { TdsCalculator } from './components/TdsCalculator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
          TDS / TCS Rate Finder
        </h1>
        <p className="mt-2 text-md sm:text-lg text-slate-600">
          FY: 2025-26 (AY: 2026-27)
        </p>
      </header>
      
      <main className="w-full max-w-4xl flex-grow">
        <TdsCalculator />
      </main>

      <footer className="w-full max-w-4xl mt-12 text-center text-xs text-slate-500">
        <p>Disclaimer: This tool is for informational purposes only. Always consult with a tax professional for advice.</p>
        <p>Data is based on the provided TDS/TCS Rate Charts.</p>
      </footer>
    </div>
  );
};

export default App;
