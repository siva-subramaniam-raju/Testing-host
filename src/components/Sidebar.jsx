import React from 'react';
import { Cow, X, BarChart3, Users, Heart, Bell, Activity, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: BarChart3 },
    { id: 'cows', label: 'Cattle Monitor', icon: Users },
    { id: 'barn', label: 'Barn Map', icon: MapPin },
    { id: 'activity', label: 'Activity Feed', icon: Activity },
    { id: 'pregnancy', label: 'Pregnancy Tracker', icon: Heart },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'analytics', label: 'Health Analytics', icon: TrendingUp },
    { id: 'attention', label: 'Attention Needed', icon: AlertTriangle },
    { id: 'trends', label: 'Behavioral Trends', icon: TrendingUp },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-64 bg-gradient-to-b from-green-600 to-green-700 shadow-xl
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Cow className="h-8 w-8 text-white" />
                <h2 className="text-xl font-bold text-white">EasyRanch</h2>
              </div>
              <button
                onClick={onToggle}
                className="lg:hidden p-2 text-white hover:bg-green-600 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all duration-200
                    flex items-center space-x-3
                    ${activeSection === item.id 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : 'text-green-100 hover:bg-green-600 hover:text-white'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-green-500">
            <div className="text-center text-green-200 text-sm">
              Smart Farm Management
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 