import React, { useState, useMemo } from 'react';
import { TDS_RATES } from '../constants/tdsData';
import { RateCategory } from '../types';
import type { TdsRate } from '../types';
import { ResultCard } from './ResultCard';

const ChevronDownIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);


export const TdsCalculator: React.FC = () => {
  const [selectedRateId, setSelectedRateId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredAndGroupedRates = useMemo(() => {
    const lowercasedFilter = searchTerm.toLowerCase();

    const filteredRates = TDS_RATES.filter(rate =>
        rate.natureOfPayment.toLowerCase().includes(lowercasedFilter) ||
        (rate.section && rate.section.toLowerCase().includes(lowercasedFilter)) ||
        (rate.code && rate.code.toLowerCase().includes(lowercasedFilter))
    );

    return filteredRates.reduce((acc, rate) => {
        if (!acc[rate.category]) {
            acc[rate.category] = [];
        }
        acc[rate.category].push(rate);
        return acc;
    }, {} as Record<RateCategory, TdsRate[]>);
  }, [searchTerm]);

  const selectedRate = useMemo(() => {
    return TDS_RATES.find(rate => rate.id === selectedRateId);
  }, [selectedRateId]);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRateId(e.target.value);
  };
  
  const hasResults = useMemo(() => Object.values(filteredAndGroupedRates).some(group => group.length > 0), [filteredAndGroupedRates]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full">
      <div className="mb-6">
        <label htmlFor="payment-search" className="block text-sm font-medium text-slate-700 mb-2">
          Search or Select Nature of Payment
        </label>
        
        <div className="relative mb-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
            </div>
            <input
                id="payment-search"
                type="text"
                placeholder="Search by payment name, section, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full bg-slate-50 border border-slate-300 text-slate-900 py-3 pl-10 pr-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
        </div>

        <div className="relative">
          <select
            id="payment-type"
            value={selectedRateId}
            onChange={handleSelectionChange}
            className="block w-full appearance-none bg-slate-50 border border-slate-300 text-slate-900 py-3 pl-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            aria-label="Select Nature of Payment"
          >
            <option value="" disabled>-- Please choose an option --</option>
            {hasResults ? (
                (Object.entries(filteredAndGroupedRates) as [RateCategory, TdsRate[]][]).map(([category, rates]) => (
                <optgroup label={category} key={category} className="font-bold">
                    {rates.map(rate => (
                    <option key={rate.id} value={rate.id} className="font-normal">
                        {rate.natureOfPayment} ({rate.section ? `Sec ${rate.section}` : `Code ${rate.code}`})
                    </option>
                    ))}
                </optgroup>
                ))
            ) : (
                <option disabled>No matching payments found</option>
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
             <ChevronDownIcon />
          </div>
        </div>
      </div>

      <div className="mt-8 transition-opacity duration-500">
        {selectedRate ? (
          <ResultCard rate={selectedRate} />
        ) : (
          <div className="text-center py-10 px-6 bg-slate-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-slate-800">Your results will appear here</h3>
            <p className="mt-1 text-sm text-slate-500">
              Search or select a payment type from the dropdown to see the TDS/TCS details.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-sm text-slate-600 bg-slate-100 p-4 rounded-md">
        <p className="font-semibold">Important Note:</p>
        <p>If PAN is not provided, the TDS rate will be 20% (or the applicable rate, whichever is higher). Please refer to Section 206AA for details.</p>
      </div>
    </div>
  );
};