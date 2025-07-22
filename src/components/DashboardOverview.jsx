import React, { useState } from 'react';
import { Beef, Leaf, Target, AlertTriangle, BarChart3, Activity, Bed, Utensils, Users, MapPin } from 'lucide-react';

const DashboardOverview = ({ metrics }) => {
  const [activeTimeFilter, setActiveTimeFilter] = useState('week');

  // Use live data if available, otherwise fall back to defaults
  const keyMetrics = [
    {
      title: 'Total Cows Monitored',
      value: metrics?.totalCows?.toString() || '142',
      trend: metrics?.trends?.totalCows || '↑12% from last month',
      icon: Beef,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Potential Pregnancies',
      value: metrics?.pregnantCows?.toString() || '38',
      trend: metrics?.trends?.pregnantCows || '↑5% from last week',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Prediction Accuracy',
      value: `${metrics?.accuracy || 92.4}%`,
      trend: metrics?.trends?.accuracy || '↑2.1% improvement',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Attention Needed',
      value: metrics?.attentionNeeded?.toString() || '7',
      trend: metrics?.trends?.attentionNeeded || '↓3 resolved',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  const pregnancyData = {
    week: {
      Holstein: { pregnant: 24, notPregnant: 8, inconclusive: 3 },
      Jersey: { pregnant: 18, notPregnant: 5, inconclusive: 4 },
      Angus: { pregnant: 12, notPregnant: 10, inconclusive: 2 },
      Hereford: { pregnant: 15, notPregnant: 7, inconclusive: 5 },
      Guernsey: { pregnant: 10, notPregnant: 3, inconclusive: 1 }
    },
    month: {
      Holstein: { pregnant: 28, notPregnant: 5, inconclusive: 2 },
      Jersey: { pregnant: 22, notPregnant: 3, inconclusive: 2 },
      Angus: { pregnant: 18, notPregnant: 4, inconclusive: 2 },
      Hereford: { pregnant: 20, notPregnant: 5, inconclusive: 2 },
      Guernsey: { pregnant: 12, notPregnant: 2, inconclusive: 0 }
    },
    quarter: {
      Holstein: { pregnant: 32, notPregnant: 2, inconclusive: 1 },
      Jersey: { pregnant: 25, notPregnant: 1, inconclusive: 1 },
      Angus: { pregnant: 21, notPregnant: 2, inconclusive: 1 },
      Hereford: { pregnant: 24, notPregnant: 2, inconclusive: 1 },
      Guernsey: { pregnant: 13, notPregnant: 1, inconclusive: 0 }
    }
  };

  const behavioralData = {
    pregnant: {
      activityLevel: 70,
      restingTime: 60,
      feedingPattern: 75,
      socialInteraction: 65,
      movementRange: 70
    },
    nonPregnant: {
      activityLevel: 50,
      restingTime: 80,
      feedingPattern: 60,
      socialInteraction: 50,
      movementRange: 80
    }
  };

  const timeFilters = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' }
  ];

  const getMaxValue = (data) => {
    return Math.max(...Object.values(data).map(breed => 
      Math.max(breed.pregnant, breed.notPregnant, breed.inconclusive)
    ));
  };

  const maxValue = getMaxValue(pregnancyData[activeTimeFilter]);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="dashboard-card rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pregnancy Status Distribution */}
        <div className="dashboard-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pregnancy Status Distribution</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="flex space-x-2 mb-6">
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveTimeFilter(filter.id);
                  console.log('Time filter changed to:', filter.label);
                }}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  activeTimeFilter === filter.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          
          <div className="space-y-4">
            {Object.entries(pregnancyData[activeTimeFilter]).map(([breed, data]) => (
              <div key={breed} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-900">{breed}</span>
                  <span className="text-gray-500">
                    Total: {data.pregnant + data.notPregnant + data.inconclusive}
                  </span>
                </div>
                <div className="flex space-x-1 h-6">
                  <div
                    className="bg-green-600 rounded-l-md"
                    style={{ width: `${(data.pregnant / maxValue) * 100}%` }}
                    title={`Pregnant: ${data.pregnant}`}
                  />
                  <div
                    className="bg-red-500"
                    style={{ width: `${(data.notPregnant / maxValue) * 100}%` }}
                    title={`Not Pregnant: ${data.notPregnant}`}
                  />
                  <div
                    className="bg-orange-500 rounded-r-md"
                    style={{ width: `${(data.inconclusive / maxValue) * 100}%` }}
                    title={`Inconclusive: ${data.inconclusive}`}
                  />
                </div>
              </div>
            ))}
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

        {/* Behavioral Indicators */}
        <div className="dashboard-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Behavioral Indicators</h2>
            <button 
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
              onClick={() => {
                console.log('Opening behavioral indicators details');
                // You could navigate to a detailed behavioral analysis page here
              }}
            >
              Details
            </button>
          </div>
          
          <div className="relative w-full h-64">
            {/* Radar Chart Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 relative">
                {/* Radar grid circles */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 border border-gray-200 rounded-full"
                    style={{
                      width: `${scale * 100}%`,
                      height: `${scale * 100}%`,
                      top: `${(1 - scale) * 50}%`,
                      left: `${(1 - scale) * 50}%`
                    }}
                  />
                ))}
                
                {/* Radar axes */}
                {['Activity Level', 'Resting Time', 'Feeding Pattern', 'Social Interaction', 'Movement Range'].map((label, index) => {
                  const angle = (index * 72 - 90) * (Math.PI / 180);
                  const x = Math.cos(angle) * 96;
                  const y = Math.sin(angle) * 96;
                  
                  return (
                    <div
                      key={index}
                      className="absolute text-xs text-gray-500"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(${x}px, ${y}px)`,
                        marginLeft: '-20px',
                        marginTop: '-10px'
                      }}
                    >
                      {label}
                    </div>
                  );
                })}
                
                {/* Pregnant Cows Data */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
                  <polygon
                    points={`${96 + 67 * Math.cos(-90 * Math.PI / 180)},${96 + 67 * Math.sin(-90 * Math.PI / 180)} ${96 + 58 * Math.cos(-18 * Math.PI / 180)},${96 + 58 * Math.sin(-18 * Math.PI / 180)} ${96 + 72 * Math.cos(54 * Math.PI / 180)},${96 + 72 * Math.sin(54 * Math.PI / 180)} ${96 + 62 * Math.cos(126 * Math.PI / 180)},${96 + 62 * Math.sin(126 * Math.PI / 180)} ${96 + 67 * Math.cos(198 * Math.PI / 180)},${96 + 67 * Math.sin(198 * Math.PI / 180)}`}
                    fill="rgba(34, 197, 94, 0.2)"
                    stroke="rgb(34, 197, 94)"
                    strokeWidth="2"
                  />
                </svg>
                
                {/* Non-Pregnant Cows Data */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
                  <polygon
                    points={`${96 + 48 * Math.cos(-90 * Math.PI / 180)},${96 + 48 * Math.sin(-90 * Math.PI / 180)} ${96 + 77 * Math.cos(-18 * Math.PI / 180)},${96 + 77 * Math.sin(-18 * Math.PI / 180)} ${96 + 58 * Math.cos(54 * Math.PI / 180)},${96 + 58 * Math.sin(54 * Math.PI / 180)} ${96 + 48 * Math.cos(126 * Math.PI / 180)},${96 + 48 * Math.sin(126 * Math.PI / 180)} ${96 + 77 * Math.cos(198 * Math.PI / 180)},${96 + 77 * Math.sin(198 * Math.PI / 180)}`}
                    fill="rgba(239, 68, 68, 0.2)"
                    stroke="rgb(239, 68, 68)"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600">Pregnant Cows (Avg)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span className="text-gray-600">Non-Pregnant Cows (Avg)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 