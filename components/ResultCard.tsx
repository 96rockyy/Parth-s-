
import React from 'react';
import type { TdsRate } from '../types';

interface ResultCardProps {
  rate: TdsRate;
}

const InfoItem: React.FC<{ label: string; value: string; isRate?: boolean }> = ({ label, value, isRate = false }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className={`text-lg ${isRate ? 'font-bold text-blue-600' : 'font-semibold text-slate-800'}`}>{value}</span>
  </div>
);

export const ResultCard: React.FC<ResultCardProps> = ({ rate }) => {
  return (
    <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-6 animate-fade-in">
      <div className="border-b border-blue-200 pb-4 mb-4">
        <h2 className="text-xl font-bold text-slate-900">{rate.natureOfPayment}</h2>
        <p className="text-sm text-slate-600">
          Under {rate.section ? `Section ${rate.section}` : `Code ${rate.code}`} of the Income Tax Act
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200/80">
          <InfoItem label="Threshold Limit" value={rate.threshold} />
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200/80">
            {rate.rate1Label && <InfoItem label={rate.rate1Label} value={rate.rate1Value} isRate />}
            {rate.rate2Label && rate.rate2Value && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                    <InfoItem label={rate.rate2Label} value={rate.rate2Value} isRate />
                </div>
            )}
        </div>
      </div>
       <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};
