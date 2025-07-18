import React from 'react';
import { Heart, Calendar, TrendingUp, CheckCircle2, Clock } from 'lucide-react';

const PregnancyStatus = () => {
  const pregnancyData = [
    {
      cowId: 'C001',
      status: 'pregnant',
      daysInCycle: 45,
      lastInsemination: '2024-01-15',
      expectedCalving: '2024-10-23',
      confidence: 95
    },
    {
      cowId: 'C023',
      status: 'heat',
      daysInCycle: 21,
      confidence: 88
    },
    {
      cowId: 'C045',
      status: 'inseminated',
      daysInCycle: 3,
      lastInsemination: '2024-02-28',
      confidence: 92
    },
    {
      cowId: 'C067',
      status: 'open',
      daysInCycle: 35,
      confidence: 78
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pregnant':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'heat':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'inseminated':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pregnant':
        return 'text-green-700 bg-green-100';
      case 'heat':
        return 'text-red-700 bg-red-100';
      case 'inseminated':
        return 'text-blue-700 bg-blue-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="dashboard-card rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Pregnancy Status</h2>
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {pregnancyData.map((data) => (
          <div
            key={data.cowId}
            className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow touch-target"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                {getStatusIcon(data.status)}
                <span className="font-medium text-gray-900 text-sm sm:text-base truncate">Cow {data.cowId}</span>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(data.status)} flex-shrink-0 ml-2`}>
                {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-gray-500">Days in cycle</p>
                <p className="font-medium">{data.daysInCycle}</p>
              </div>
              <div>
                <p className="text-gray-500">Confidence</p>
                <p className="font-medium">{data.confidence}%</p>
              </div>
            </div>
            
            {data.lastInsemination && (
              <div className="mt-3 text-xs sm:text-sm">
                <p className="text-gray-500">Last insemination</p>
                <p className="font-medium truncate">{data.lastInsemination}</p>
              </div>
            )}
            
            {data.expectedCalving && (
              <div className="mt-3 text-xs sm:text-sm">
                <p className="text-gray-500">Expected calving</p>
                <p className="font-medium text-green-600 truncate">{data.expectedCalving}</p>
              </div>
            )}
            
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${data.confidence}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PregnancyStatus; 