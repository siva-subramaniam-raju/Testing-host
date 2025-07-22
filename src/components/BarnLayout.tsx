import React, { useState } from 'react';
import { Eye, MapPin, Thermometer } from 'lucide-react';

interface CowPosition {
  id: string;
  cowId: string;
  x: number;
  y: number;
  status: 'active' | 'resting' | 'feeding' | 'alert';
  temperature: number;
  name: string;
}

const BarnLayout: React.FC = () => {
  const [selectedCow, setSelectedCow] = useState<string | null>(null);

  const cows: CowPosition[] = [
    {
      id: '1',
      cowId: 'C001',
      x: 20,
      y: 30,
      status: 'resting',
      temperature: 38.5,
      name: 'C001'
    },
    {
      id: '2',
      cowId: 'C023',
      x: 60,
      y: 20,
      status: 'alert',
      temperature: 39.1,
      name: 'C023'
    },
    {
      id: '3',
      cowId: 'C045',
      x: 40,
      y: 60,
      status: 'feeding',
      temperature: 38.8,
      name: 'C045'
    },
    {
      id: '4',
      cowId: 'C067',
      x: 80,
      y: 40,
      status: 'active',
      temperature: 38.6,
      name: 'C067'
    },
    {
      id: '5',
      cowId: 'C012',
      x: 25,
      y: 75,
      status: 'resting',
      temperature: 38.4,
      name: 'C012'
    },
    {
      id: '6',
      cowId: 'C089',
      x: 70,
      y: 70,
      status: 'active',
      temperature: 38.7,
      name: 'C089'
    }
  ];

  const getStatusColor = (status: string) => {
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

  const averageTemperature = cows.reduce((sum, cow) => sum + cow.temperature, 0) / cows.length;

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Barn Layout</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Eye className="dashboard-icon" />
            <span className="text-sm text-gray-600">Live View</span>
          </div>
          <MapPin className="dashboard-icon" />
        </div>
      </div>
      
      <div className="chart-container mb-4">
        <div className="barn-container h-80">
          {/* Barn structure elements */}
          <div className="absolute top-4 left-4 right-4 h-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute bottom-4 left-4 right-4 h-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute top-16 left-4 bottom-16 w-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute top-16 right-4 bottom-16 w-8 bg-gray-300 rounded opacity-50"></div>
          <div className="absolute top-4 left-16 w-20 h-8 bg-yellow-200 rounded opacity-70"></div>
          <div className="absolute top-4 right-16 w-20 h-8 bg-yellow-200 rounded opacity-70"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-blue-200 rounded opacity-70"></div>
          
          {/* Cow positions */}
          {cows.map((cow) => (
            <div
              key={cow.id}
              className={`cow-dot ${cow.status}`}
              style={{ left: `${cow.x}%`, top: `${cow.y}%` }}
              title={`${cow.name} - ${cow.status} - ${cow.temperature}°C`}
              onClick={() => setSelectedCow(cow.cowId)}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {cow.name}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Resting</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Feeding</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Alert</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Thermometer className="w-4 h-4" />
          <span>Avg: {averageTemperature.toFixed(1)}°C</span>
        </div>
      </div>
    </div>
  );
};

export default BarnLayout; 