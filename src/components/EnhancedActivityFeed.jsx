import React from 'react';
import { Clock, Activity, AlertCircle, CheckCircle } from 'lucide-react';
import CowImage from './CowImage.jsx';

const EnhancedActivityFeed = () => {
  const activities = [
    {
      id: '1',
      cowId: 'C001',
      activity: 'Eating',
      timestamp: '2 min ago',
      type: 'normal',
      description: 'Started feeding at station 3',
      breed: 'Holstein'
    },
    {
      id: '2',
      cowId: 'C045',
      activity: 'Ruminating',
      timestamp: '5 min ago',
      type: 'success',
      description: 'Good rumination pattern detected',
      breed: 'Guernsey'
    },
    {
      id: '3',
      cowId: 'C023',
      activity: 'Abnormal behavior',
      timestamp: '12 min ago',
      type: 'alert',
      description: 'Excessive lying detected',
      breed: 'Jersey'
    },
    {
      id: '4',
      cowId: 'C012',
      activity: 'Walking',
      timestamp: '15 min ago',
      type: 'normal',
      description: 'Moving to water station',
      breed: 'Holstein'
    },
    {
      id: '5',
      cowId: 'C089',
      activity: 'Lying',
      timestamp: '18 min ago',
      type: 'normal',
      description: 'Resting in stall area',
      breed: 'Holstein'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'alert':
        return 'border-red-200 bg-red-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Real-time Activity</h2>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`p-3 rounded-lg border-l-4 ${getActivityColor(activity.type)} transition-all hover:shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CowImage breed={activity.breed} size="small" />
                <div className="flex items-center space-x-2">
                  {getActivityIcon(activity.type)}
                  <span className="font-medium text-gray-900">Cow {activity.cowId}</span>
                </div>
              </div>
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            <div className="mt-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                {activity.activity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnhancedActivityFeed; 