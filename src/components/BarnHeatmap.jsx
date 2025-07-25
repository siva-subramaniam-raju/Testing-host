import React from 'react';
import { MapPin, Thermometer, Eye } from 'lucide-react';

const BarnHeatmap = ({ onCowSelect }) => {
  const cowPositions = [
    { id: 'C001', x: 20, y: 30, status: 'resting', temperature: 38.5 },
    { id: 'C023', x: 60, y: 20, status: 'alert', temperature: 39.1 },
    { id: 'C045', x: 40, y: 60, status: 'feeding', temperature: 38.8 },
    { id: 'C067', x: 80, y: 40, status: 'active', temperature: 38.6 },
    { id: 'C012', x: 25, y: 75, status: 'resting', temperature: 38.4 },
    { id: 'C089', x: 70, y: 70, status: 'active', temperature: 38.7 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 border-green-600';
      case 'resting':
        return 'bg-blue-500 border-blue-600';
      case 'feeding':
        return 'bg-yellow-500 border-yellow-600';
      case 'alert':
        return 'bg-red-500 border-red-600 animate-pulse';
      default:
        return 'bg-gray-500 border-gray-600';
    }
  };

  return (
    <div className="dashboard-card rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Barn Layout</h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">Live View</span>
          </div>
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
        <div className="relative h-48 sm:h-80 bg-green-100 rounded-lg border-2 border-green-200 overflow-hidden">
          {/* Barn structures */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 h-4 sm:h-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 h-4 sm:h-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute top-8 sm:top-16 left-2 sm:left-4 bottom-8 sm:bottom-16 w-4 sm:w-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute top-8 sm:top-16 right-2 sm:right-4 bottom-8 sm:bottom-16 w-4 sm:w-8 bg-gray-300 rounded opacity-50"></div>
          
          {/* Feeding areas */}
          <div className="absolute top-2 sm:top-4 left-8 sm:left-16 w-10 sm:w-20 h-4 sm:h-8 bg-yellow-200 rounded opacity-70"></div>
          <div className="absolute top-2 sm:top-4 right-8 sm:right-16 w-10 sm:w-20 h-4 sm:h-8 bg-yellow-200 rounded opacity-70"></div>
          
          {/* Water stations */}
          <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 w-6 sm:w-12 h-4 sm:h-8 bg-blue-200 rounded opacity-70"></div>
          
          {/* Cow positions */}
          {cowPositions.map((cow) => (
            <div
              key={cow.id}
              className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all touch-target ${getStatusColor(cow.status)}`}
              style={{ left: `${cow.x}%`, top: `${cow.y}%` }}
              onClick={() => onCowSelect(cow.id)}
              title={`Cow ${cow.id} - ${cow.status} - ${cow.temperature}°C`}
            >
              <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {cow.id}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">Active</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">Resting</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">Feeding</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs sm:text-sm text-gray-600">Alert</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
          <Thermometer className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Avg: 38.7°C</span>
        </div>
      </div>
    </div>
  );
};

export default BarnHeatmap; 