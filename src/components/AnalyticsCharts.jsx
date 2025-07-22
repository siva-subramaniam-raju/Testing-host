import React, { useState } from 'react';
import { BarChart3, TrendingUp, Activity, Thermometer } from 'lucide-react';

const AnalyticsCharts = () => {
  const [activeTab, setActiveTab] = useState('activity');

  const activityData = [
    { time: '00:00', value: 20 },
    { time: '04:00', value: 15 },
    { time: '08:00', value: 80 },
    { time: '12:00', value: 95 },
    { time: '16:00', value: 70 },
    { time: '20:00', value: 45 }
  ];

  const ruminationData = [
    { time: '00:00', value: 85 },
    { time: '04:00', value: 90 },
    { time: '08:00', value: 40 },
    { time: '12:00', value: 35 },
    { time: '16:00', value: 60 },
    { time: '20:00', value: 75 }
  ];

  const temperatureData = [
    { time: '00:00', value: 38.4 },
    { time: '04:00', value: 38.2 },
    { time: '08:00', value: 38.8 },
    { time: '12:00', value: 39.1 },
    { time: '16:00', value: 38.9 },
    { time: '20:00', value: 38.6 }
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'rumination':
        return ruminationData;
      case 'temperature':
        return temperatureData;
      default:
        return activityData;
    }
  };

  const getChartColor = () => {
    switch (activeTab) {
      case 'rumination':
        return 'bg-blue-500';
      case 'temperature':
        return 'bg-red-500';
      default:
        return 'bg-green-500';
    }
  };

  const getMaxValue = () => {
    const data = getCurrentData();
    return Math.max(...data.map(d => d.value));
  };

  const tabs = [
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'rumination', label: 'Rumination', icon: TrendingUp },
    { id: 'temperature', label: 'Temperature', icon: Thermometer }
  ];

  return (
    <div className="dashboard-card rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">Daily Trends</h2>
        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
      </div>
      
      <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-100 rounded-lg p-1 border-farm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all touch-target ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="h-32 sm:h-48 flex items-end justify-between space-x-1 sm:space-x-2">
        {getCurrentData().map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-200 rounded-t-lg relative h-20 sm:h-32 flex items-end">
              <div
                className={`w-full rounded-t-lg transition-all duration-500 ${getChartColor()}`}
                style={{
                  height: `${(data.value / getMaxValue()) * 100}%`,
                  minHeight: '4px'
                }}
              ></div>
              <div className="absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                {activeTab === 'temperature' ? `${data.value}°C` : data.value}
              </div>
            </div>
            <div className="mt-1 sm:mt-2 text-xs text-gray-500">{data.time}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0">
        <span>Last 24 hours</span>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-1">
            <span>Avg:</span>
            <span className="font-medium">
              {activeTab === 'temperature' 
                ? `${(getCurrentData().reduce((sum, d) => sum + d.value, 0) / getCurrentData().length).toFixed(1)}°C`
                : Math.round(getCurrentData().reduce((sum, d) => sum + d.value, 0) / getCurrentData().length)
              }
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Peak:</span>
            <span className="font-medium">
              {activeTab === 'temperature' 
                ? `${Math.max(...getCurrentData().map(d => d.value)).toFixed(1)}°C`
                : Math.max(...getCurrentData().map(d => d.value))
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts; 