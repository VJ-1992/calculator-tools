
import React, { useState } from 'react';
import CalculatorCard from './CalculatorCard';

const MarginIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
);

const ProfitMarginCalculator: React.FC = () => {
  const [cost, setCost] = useState<string>('');
  const [selling, setSelling] = useState<string>('');
  const [currency, setCurrency] = useState<string>('$');
  const [results, setResults] = useState<{
    profit: number;
    margin: number;
  } | null>(null);

  const calculate = () => {
    const cp = parseFloat(cost);
    const sp = parseFloat(selling);

    if (isNaN(cp) || isNaN(sp) || cp < 0 || sp < 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    if (sp === 0) {
      alert("Selling price cannot be zero when calculating margin");
      return;
    }

    const profit = sp - cp;
    const margin = (profit / sp) * 100;

    setResults({ profit, margin });
  };

  return (
    <CalculatorCard 
      title="Profit Margin" 
      icon={<MarginIcon />}
      description="Essential for business owners to determine profitability on every sale."
      formula="Margin % = ((Selling Price - Cost Price) / Selling Price) × 100"
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
          <label className="block text-sm font-medium text-slate-700 mb-1">Cost Price ({currency})</label>
          <input 
            type="number" 
            placeholder="What you paid"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Selling Price ({currency})</label>
          <input 
            type="number" 
            placeholder="Price you're charging"
            value={selling}
            onChange={(e) => setSelling(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
        <button 
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
        >
          Calculate Margin
        </button>

        {results && (
          <div className={`mt-6 p-4 rounded-xl border animate-in fade-in duration-300 ${results.profit >= 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-red-50 border-red-100'}`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-xs uppercase font-bold tracking-wider mb-1 ${results.profit >= 0 ? 'text-indigo-600' : 'text-red-600'}`}>
                  {results.profit >= 0 ? 'Profit Amount' : 'Loss Amount'}
                </p>
                <p className="text-xl font-bold text-slate-900">{currency}{Math.abs(results.profit).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className={`text-xs uppercase font-bold tracking-wider mb-1 ${results.profit >= 0 ? 'text-indigo-600' : 'text-red-600'}`}>
                  Gross Margin
                </p>
                <p className="text-xl font-bold text-slate-900">{results.margin.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
};

export default ProfitMarginCalculator;
