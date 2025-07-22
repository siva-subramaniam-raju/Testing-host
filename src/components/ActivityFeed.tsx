import React, { useState } from 'react';
import { Clock, Activity, AlertCircle, CheckCircle, Filter, RefreshCw, Eye, ChevronDown } from 'lucide-react';

const ActivityFeed = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activities = [
    {
      id: '1',
      cowId: 'C001',
      activity: 'Eating',
      timestamp: '2 min ago',
      type: 'normal',
      description: 'Started feeding at station 3',
      duration: '15 min',
      location: 'Feeding Station 3'
    },
    {
      id: '2',
      cowId: 'C045',
      activity: 'Ruminating',
      timestamp: '5 min ago',
      type: 'success',
      description: 'Good rumination pattern detected',
      duration: '45 min',
      location: 'Stall Area A'
    },
    {
      id: '3',
      cowId: 'C023',
      activity: 'Abnormal behavior',
      timestamp: '12 min ago',
      type: 'alert',
      description: 'Excessive lying detected',
      duration: '2 hours',
      location: 'Stall Area B'
    },
    {
      id: '4',
      cowId: 'C012',
      activity: 'Walking',
      timestamp: '15 min ago',
      type: 'normal',
      description: 'Moving to water station',
      duration: '5 min',
      location: 'Water Station 2'
    },
    {
      id: '5',
      cowId: 'C089',
      activity: 'Lying',
      timestamp: '18 min ago',
      type: 'normal',
      description: 'Resting in stall area',
      duration: '30 min',
      location: 'Stall Area C'
    },
    {
      id: '6',
      cowId: 'C067',
      activity: 'Heat detection',
      timestamp: '25 min ago',
      type: 'success',
      description: 'Heat cycle indicators detected',
      duration: 'Ongoing',
      location: 'Breeding Area'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Activities', count: activities.length },
    { id: 'normal', label: 'Normal', count: activities.filter(a => a.type === 'normal').length },
    { id: 'success', label: 'Success', count: activities.filter(a => a.type === 'success').length },
    { id: 'alert', label: 'Alerts', count: activities.filter(a => a.type === 'alert').length }
  ];

  const filteredActivities = selectedFilter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === selectedFilter);

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
        return 'border-red-200 bg-red-50 hover:bg-red-100';
      case 'success':
        return 'border-green-200 bg-green-50 hover:bg-green-100';
      default:
        return 'border-blue-200 bg-blue-50 hover:bg-blue-100';
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleViewDetails = (activity) => {
    console.log('Viewing details for:', activity);
    // Here you would typically open a modal or navigate to a detail page
  };

  return (
    <div className="dashboard-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900">Real-time Activity</h2>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {/* Filter Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {filters.map((filter) => (
              <option key={filter.id} value={filter.id}>
                {filter.label} ({filter.count})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className={`p-4 rounded-lg border-l-4 ${getActivityColor(activity.type)} transition-all hover:shadow-md cursor-pointer group`}
            onClick={() => handleViewDetails(activity)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getActivityIcon(activity.type)}
                <div>
                  <span className="font-medium text-gray-900">Cow {activity.cowId}</span>
                  <span className="text-xs text-gray-500 ml-2">• {activity.location}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
                <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mt-2">{activity.description}</p>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-3">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  {activity.activity}
                </span>
                <span className="text-xs text-gray-500">
                  Duration: {activity.duration}
                </span>
              </div>
              
              <button className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
        
        {filteredActivities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No activities found for the selected filter.</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed; 