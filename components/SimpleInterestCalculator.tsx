
import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';

const InterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="3"/><path d="M16 12h6"/><path d="M21 12v6"/><circle cx="16" cy="16" r="3"/><path d="M2 12h6"/><path d="M7 12v6"/></svg>
);

const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [currency, setCurrency] = useState<string>('$');
  const [results, setResults] = useState<{
    interest: number;
    total: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p < 0 || r < 0 || t < 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    const interest = (p * r * t) / 100;
    const total = p + interest;

    setResults({ interest, total });
  };

  return (
    <CalculatorCard 
      title="Simple Interest" 
      icon={<InterestIcon />}
      description="Quickly estimate your returns or loan costs based on simple interest rates."
      formula="Interest = Principal × Rate × Time / 100"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Currency</span>
          <div className="flex p-0.5 bg-slate-100 rounded-lg">
            <button 
              onClick={() => setCurrency('$')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${currency === '$' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              USD ($)
            </button>
            <button 
              onClick={() => setCurrency('₹')}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${currency === '₹' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              INR (₹)
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Principal Amount ({currency})</label>
          <input 
            type="number" 
            placeholder={`e.g. ${currency === '$' ? '5000' : '100000'}`}
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Rate (% p.a.)</label>
            <input 
              type="number" 
              placeholder="e.g. 5"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time (Years)</label>
            <input 
              type="number" 
              placeholder="e.g. 2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        <button 
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
        >
          Calculate Interest
        </button>

        {results && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-blue-600 uppercase font-bold tracking-wider mb-1">Interest Earned</p>
                <p className="text-xl font-bold text-slate-900">{currency}{results.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs text-blue-600 uppercase font-bold tracking-wider mb-1">Total Amount</p>
                <p className="text-xl font-bold text-slate-900">{currency}{results.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
};

export default SimpleInterestCalculator;
