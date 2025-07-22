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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{cowData.name}</h2>
            <p className="text-sm text-gray-600 truncate">Cow ID: {cowData.id} • {cowData.breed} • {cowData.age} years</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-target ml-2"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="text-xs sm:text-sm text-green-800">Health Score</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-900">{cowData.healthScore}%</p>
            </div>
            
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-xs sm:text-sm text-blue-800">Temperature</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-900">{cowData.temperature}°C</p>
            </div>
            
            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                <span className="text-xs sm:text-sm text-yellow-800">Milk Production</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-yellow-900">{cowData.dailyMilkProduction}L</p>
            </div>
            
            <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                <span className="text-xs sm:text-sm text-purple-800">Rumination</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-purple-900">{cowData.averageRumination}h</p>
            </div>
          </div>
          
          {/* Reproductive Status */}
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Reproductive Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Current Status</p>
                <p className="font-medium text-green-600 text-sm sm:text-base">{cowData.reproductiveStatus}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Last Calving</p>
                <p className="font-medium text-sm sm:text-base">{cowData.lastCalving}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Expected Calving</p>
                <p className="font-medium text-sm sm:text-base">{cowData.nextExpectedCalving}</p>
              </div>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {cowData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className="font-medium text-sm sm:text-base truncate">{activity.activity}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 flex-shrink-0">
                    <span>{activity.time}</span>
                    <span>{activity.duration} min</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Health History */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Health History</h3>
            <div className="space-y-3">
              {cowData.healthHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{record.event}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{record.date}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex-shrink-0">
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