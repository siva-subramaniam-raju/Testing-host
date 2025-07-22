import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Eye, ChevronDown } from 'lucide-react';

interface Alert {
  id: string;
  cowId: string;
  cowName: string;
  title: string;
  message: string;
  details: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  type: 'health' | 'breeding' | 'behavior' | 'system';
  resolved: boolean;
}

const SmartAlerts: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [hideResolved, setHideResolved] = useState<boolean>(false);

  const alerts: Alert[] = [
    {
      id: '1',
      cowId: 'C023',
      cowName: 'Cow C023',
      title: 'Elevated temperature detected',
      message: 'Temperature reading: 39.8°C (Normal: 38.0-39.0°C)',
      details: 'Temperature reading: 39.8°C (Normal: 38.0-39.0°C)',
      time: '10 min ago',
      priority: 'high',
      type: 'health',
      resolved: false
    },
    {
      id: '2',
      cowId: 'C045',
      cowName: 'Cow C045',
      title: 'Heat cycle detected - breeding window open',
      message: 'Heat signs detected. Ready for artificial insemination.',
      details: 'Heat signs detected. Ready for artificial insemination.',
      time: '25 min ago',
      priority: 'medium',
      type: 'breeding',
      resolved: false
    },
    {
      id: '3',
      cowId: 'C012',
      cowName: 'Cow C012',
      title: 'Decreased activity levels',
      message: 'Activity reduced by 40% compared to normal patterns',
      details: 'Activity reduced by 40% compared to normal patterns',
      time: '1 hour ago',
      priority: 'medium',
      type: 'behavior',
      resolved: false
    },
    {
      id: '4',
      cowId: 'system',
      cowName: 'System',
      title: 'Sensor battery low - Barn sensor #5',
      message: 'Battery level: 15%. Replace within 24 hours.',
      details: 'Battery level: 15%. Replace within 24 hours.',
      time: '2 hours ago',
      priority: 'low',
      type: 'system',
      resolved: true
    },
    {
      id: '5',
      cowId: 'C089',
      cowName: 'Cow C089',
      title: 'Abnormal rumination patterns',
      message: 'Rumination time reduced by 60%. Check for health issues.',
      details: 'Rumination time reduced by 60%. Check for health issues.',
      time: '3 hours ago',
      priority: 'high',
      type: 'health',
      resolved: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-green-200 bg-green-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'health':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'breeding':
        return <Bell className="w-4 h-4 text-blue-500" />;
      case 'behavior':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (hideResolved && alert.resolved) return false;
    if (filter === 'all') return true;
    return alert.type === filter;
  });

  const activeAlerts = alerts.filter(alert => !alert.resolved).length;

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900">Smart Alerts</h2>
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            <span className="text-sm text-gray-600">{activeAlerts} active</span>
          </div>
        </div>
        <button 
          onClick={() => setHideResolved(!hideResolved)}
          className="dashboard-button secondary"
        >
          {hideResolved ? 'Show Resolved' : 'Hide Resolved'}
        </button>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="dashboard-select"
            title="Filter alerts by type"
          >
            <option value="all">All Alerts ({alerts.length})</option>
            <option value="health">Health ({alerts.filter(a => a.type === 'health').length})</option>
            <option value="breeding">Breeding ({alerts.filter(a => a.type === 'breeding').length})</option>
            <option value="behavior">Behavior ({alerts.filter(a => a.type === 'behavior').length})</option>
            <option value="system">System ({alerts.filter(a => a.type === 'system').length})</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 dashboard-icon pointer-events-none" />
        </div>
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto dashboard-scroll">
        {filteredAlerts.map((alert) => (
          <div 
            key={alert.id}
            className={`alert-item ${alert.priority}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getTypeIcon(alert.type)}
                <div>
                  <span className="text-sm font-medium text-gray-900">{alert.cowName}</span>
                  <span className="text-xs text-gray-500 ml-2">• {alert.time}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors" title="View details">
                  <Eye className="w-4 h-4" />
                </button>
                {!alert.resolved && (
                  <button className="p-1 text-green-600 hover:text-green-800 transition-colors" title="Mark as resolved">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-700 mt-2">{alert.title}</p>
            <p className="text-xs text-gray-500 mt-1">{alert.details}</p>
            <div className="flex items-center justify-between mt-3">
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(alert.priority)}`}>
                {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
              </span>
              {!alert.resolved && (
                <button className="text-xs text-green-600 hover:text-green-800 font-medium transition-colors">
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
          View All Alerts
        </button>
      </div>
    </div>
  );
};

export default SmartAlerts; 