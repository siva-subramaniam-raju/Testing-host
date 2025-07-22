import React from 'react';
import { BarChart3 } from 'lucide-react';

interface PregnancyStatusDistributionProps {
  timeframe: 'week' | 'month' | 'quarter';
}

const PregnancyStatusDistribution: React.FC<PregnancyStatusDistributionProps> = ({ timeframe }) => {
  const breedData = [
    {
      breed: 'Holstein',
      total: 35,
      pregnant: 24,
      notPregnant: 8,
      inconclusive: 3
    },
    {
      breed: 'Jersey',
      total: 27,
      pregnant: 18,
      notPregnant: 5,
      inconclusive: 4
    },
    {
      breed: 'Angus',
      total: 24,
      pregnant: 12,
      notPregnant: 10,
      inconclusive: 2
    },
    {
      breed: 'Hereford',
      total: 27,
      pregnant: 15,
      notPregnant: 7,
      inconclusive: 5
    },
    {
      breed: 'Guernsey',
      total: 14,
      pregnant: 10,
      notPregnant: 3,
      inconclusive: 1
    }
  ];

  const calculatePercentages = (data: typeof breedData[0]) => {
    const total = data.pregnant + data.notPregnant + data.inconclusive;
    return {
      pregnant: (data.pregnant / total) * 100,
      notPregnant: (data.notPregnant / total) * 100,
      inconclusive: (data.inconclusive / total) * 100
    };
  };

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Pregnancy Status Distribution</h2>
        <BarChart3 className="dashboard-icon" />
      </div>
      
      <div className="flex space-x-2 mb-6">
        <button className={`dashboard-button ${timeframe === 'week' ? '' : 'secondary'}`}>
          Week
        </button>
        <button className={`dashboard-button ${timeframe === 'month' ? '' : 'secondary'}`}>
          Month
        </button>
        <button className={`dashboard-button ${timeframe === 'quarter' ? '' : 'secondary'}`}>
          Quarter
        </button>
      </div>
      
      <div className="space-y-4">
        {breedData.map((breed) => {
          const percentages = calculatePercentages(breed);
          return (
            <div key={breed.breed} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-900">{breed.breed}</span>
                <span className="text-gray-500">Total: {breed.total}</span>
              </div>
              <div className="flex space-x-1 h-6">
                <div 
                  className="bg-green-600 rounded-l-md" 
                  title={`Pregnant: ${breed.pregnant}`}
                  style={{ width: `${percentages.pregnant}%` }}
                ></div>
                <div 
                  className="bg-red-500" 
                  title={`Not Pregnant: ${breed.notPregnant}`}
                  style={{ width: `${percentages.notPregnant}%` }}
                ></div>
                <div 
                  className="bg-orange-500 rounded-r-md" 
                  title={`Inconclusive: ${breed.inconclusive}`}
                  style={{ width: `${percentages.inconclusive}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <span className="text-gray-600">Pregnant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Not Pregnant</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-gray-600">Inconclusive</span>
        </div>
      </div>
    </div>
  );
};

export default PregnancyStatusDistribution; 