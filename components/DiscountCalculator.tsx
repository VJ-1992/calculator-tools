
import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';

const DiscountIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 5 1.5 1.5L21 3"/><path d="M13 7h8"/><path d="M5 3v18"/><path d="m19 13-1.5 1.5L13 19"/><path d="M21 15h-8"/><path d="m5 3 2 2"/><path d="m5 21 2-2"/></svg>
);

const DiscountCalculator: React.FC = () => {
  const [price, setPrice] = useState<string>('');
  const [percent, setPercent] = useState<string>('');
  const [currency, setCurrency] = useState<string>('$');
  const [results, setResults] = useState<{
    savings: number;
    final: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(percent);

    if (isNaN(p) || isNaN(d) || p < 0 || d < 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    const savings = (p * d) / 100;
    const final = p - savings;

    setResults({ savings, final });
  };

  return (
    <CalculatorCard 
      title="Discount Calculator" 
      icon={<DiscountIcon />}
      description="Calculate exactly how much you save and the final price after a discount."
      formula="Final Price = Original Price - (Original Price × Discount % / 100)"
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
          <label className="block text-sm font-medium text-slate-700 mb-1">Original Price ({currency})</label>
          <input 
            type="number" 
            placeholder={`e.g. ${currency === '$' ? '100' : '5000'}`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Discount (%)</label>
          <input 
            type="number" 
            placeholder="e.g. 20"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <button 
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
        >
          Calculate Savings
        </button>

        {results && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-100 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-green-600 uppercase font-bold tracking-wider mb-1">Total Savings</p>
                <p className="text-xl font-bold text-slate-900">{currency}{results.savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs text-green-600 uppercase font-bold tracking-wider mb-1">Final Price</p>
                <p className="text-xl font-bold text-slate-900">{currency}{results.final.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
};

export default DiscountCalculator;
