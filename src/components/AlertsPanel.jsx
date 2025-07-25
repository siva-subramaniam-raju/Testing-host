import React, { useState } from 'react';
import { AlertTriangle, Bell, Clock, CheckCircle, Eye, ChevronDown } from 'lucide-react';

const AlertsPanel = () => {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      type: 'health',
      priority: 'high',
      message: 'Elevated temperature detected',
      cowId: 'C023',
      timestamp: '5 min ago',
      resolved: false,
      details: 'Temperature: 39.8°C (Normal: 38.5°C). Monitor closely.'
    },
    {
      id: '2',
      type: 'breeding',
      priority: 'medium',
      message: 'Heat cycle indicators detected',
      cowId: 'C045',
      timestamp: '15 min ago',
      resolved: false,
      details: 'Cow showing signs of estrus. Ready for breeding.'
    },
    {
      id: '3',
      type: 'behavior',
      priority: 'medium',
      message: 'Reduced activity levels',
      cowId: 'C067',
      timestamp: '1 hour ago',
      resolved: false,
      details: 'Activity reduced by 40% compared to normal patterns'
    },
    {
      id: '4',
      type: 'system',
      priority: 'low',
      message: 'Sensor battery low - Barn sensor #5',
      timestamp: '2 hours ago',
      resolved: true,
      details: 'Battery level: 15%. Replace within 24 hours.'
    },
    {
      id: '5',
      type: 'health',
      priority: 'high',
      message: 'Abnormal rumination patterns',
      cowId: 'C089',
      timestamp: '3 hours ago',
      resolved: true,
      details: 'Rumination time reduced by 60%. Check for health issues.'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showResolved, setShowResolved] = useState(true);

  const filters = [
    { id: 'all', label: 'All Alerts', count: alerts.length },
    { id: 'health', label: 'Health', count: alerts.filter(a => a.type === 'health').length },
    { id: 'breeding', label: 'Breeding', count: alerts.filter(a => a.type === 'breeding').length },
    { id: 'behavior', label: 'Behavior', count: alerts.filter(a => a.type === 'behavior').length },
    { id: 'system', label: 'System', count: alerts.filter(a => a.type === 'system').length }
  ];

  const handleResolveAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const handleViewDetails = (alert) => {
    console.log('Viewing alert details:', alert);
    // Here you would typically open a modal with detailed information
  };

  const getAlertIcon = (type, resolved) => {
    if (resolved) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    
    switch (type) {
      case 'health':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'breeding':
        return <Bell className="w-4 h-4 text-blue-500" />;
      case 'behavior':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority, resolved) => {
    if (resolved) {
      return 'border-green-200 bg-green-50';
    }
    
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50 hover:bg-red-100';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100';
      default:
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

  const filteredAlerts = selectedFilter === 'all' 
    ? (showResolved ? alerts : activeAlerts)
    : alerts.filter(alert => alert.type === selectedFilter && (showResolved || !alert.resolved));

  return (
    <div className="dashboard-card rounded-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Smart Alerts</h2>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="text-xs sm:text-sm text-gray-600">{activeAlerts.length} active</span>
          </div>
        </div>
        <button 
          onClick={() => setShowResolved(!showResolved)}
          className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors touch-target"
        >
          {showResolved ? 'Hide Resolved' : 'Show Resolved'}
        </button>
      </div>
      
      {/* Filter Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 sm:flex-none">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
      
      <div className="space-y-3 sm:space-y-4 max-h-80 overflow-y-auto">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 sm:p-4 rounded-lg border-l-4 ${getPriorityColor(alert.priority, alert.resolved)} transition-all hover:shadow-md group touch-target`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                {getAlertIcon(alert.type, alert.resolved)}
                <div className="min-w-0 flex-1">
                  <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                    {alert.cowId ? `Cow ${alert.cowId}` : 'System'}
                  </span>
                  <span className="text-xs text-gray-500 ml-1 sm:ml-2 truncate block sm:inline">• {alert.timestamp}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <button 
                  onClick={() => handleViewDetails(alert)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors touch-target"
                  aria-label="View details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                {!alert.resolved && (
                  <button 
                    onClick={() => handleResolveAlert(alert.id)}
                    className="p-1 text-green-600 hover:text-green-800 transition-colors touch-target"
                    title="Mark as resolved"
                    aria-label="Resolve alert"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-700 mt-2 line-clamp-2">{alert.message}</p>
            
            {alert.details && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{alert.details}</p>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full truncate ${
                alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
              </span>
              
              {!alert.resolved && (
                <button 
                  onClick={() => handleResolveAlert(alert.id)}
                  className="text-xs text-green-600 hover:text-green-800 font-medium transition-colors flex-shrink-0 touch-target"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
        
        {filteredAlerts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm sm:text-base">No alerts found for the selected filter.</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors touch-target py-2">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default AlertsPanel; 