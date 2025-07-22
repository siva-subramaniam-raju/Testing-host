import React from 'react';
import { X, Heart, Activity, Thermometer, Calendar, TrendingUp } from 'lucide-react';

const CowDetails = ({ cowId, onClose }) => {
  const cowData = {
    id: cowId,
    name: 'Bessie',
    breed: 'Holstein',
    age: 4,
    weight: 650,
    healthScore: 92,
    temperature: 38.5,
    activityLevel: 'normal',
    reproductiveStatus: 'Pregnant',
    lastCalving: '2023-03-15',
    nextExpectedCalving: '2024-10-23',
    dailyMilkProduction: 28.5,
    averageRumination: 7.5,
    recentActivity: [
      { time: '08:00', activity: 'Feeding', duration: 45 },
      { time: '09:30', activity: 'Ruminating', duration: 120 },
      { time: '11:00', activity: 'Walking', duration: 15 },
      { time: '12:00', activity: 'Lying', duration: 180 }
    ],
    healthHistory: [
      { date: '2024-02-25', event: 'Routine checkup', status: 'Good' },
      { date: '2024-02-20', event: 'Vaccination', status: 'Completed' },
      { date: '2024-02-15', event: 'Pregnancy check', status: 'Confirmed' }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{cowData.name}</h2>
            <p className="text-gray-600">Cow ID: {cowData.id} • {cowData.breed} • {cowData.age} years</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800">Health Score</span>
              </div>
              <p className="text-2xl font-bold text-green-900">{cowData.healthScore}%</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-blue-800">Temperature</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">{cowData.temperature}°C</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <span className="text-sm text-yellow-800">Milk Production</span>
              </div>
              <p className="text-2xl font-bold text-yellow-900">{cowData.dailyMilkProduction}L</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-purple-800">Rumination</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">{cowData.averageRumination}h</p>
            </div>
          </div>
          
          {/* Reproductive Status */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reproductive Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Current Status</p>
                <p className="font-medium text-green-600">{cowData.reproductiveStatus}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Calving</p>
                <p className="font-medium">{cowData.lastCalving}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Calving</p>
                <p className="font-medium">{cowData.nextExpectedCalving}</p>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {cowData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-medium">{activity.activity}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{activity.time}</span>
                    <span>{activity.duration} min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Health History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health History</h3>
            <div className="space-y-3">
              {cowData.healthHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium">{record.event}</p>
                      <p className="text-sm text-gray-600">{record.date}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {record.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CowDetails; 