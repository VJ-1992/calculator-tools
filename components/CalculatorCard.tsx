
import React from 'react';

interface CalculatorCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
  formula: string;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ title, icon, description, children, formula }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <div className="p-6 md:p-8 flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        </div>
        <p className="text-slate-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {children}
      </div>
      
      <div className="bg-slate-50 p-6 border-t border-slate-100">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">How it's calculated</h4>
        <p className="text-sm text-slate-500 font-mono italic">
          {formula}
        </p>
      </div>
    </div>
  );
};

export default CalculatorCard;
