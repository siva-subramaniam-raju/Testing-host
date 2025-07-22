import React from 'react';
import { Beef, X, BarChart3, Users, Heart, Bell, Activity, MapPin, TrendingUp, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarProps, MenuItem } from '../types';

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onToggle, 
  isCollapsed, 
  onCollapseChange 
}) => {
  const menuItems: MenuItem[] = [
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

  const toggleCollapse = (): void => {
    onCollapseChange(!isCollapsed);
  };

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
        fixed top-0 left-0 h-full z-[9999] transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-green-500 to-green-600 shadow-2xl border-r-4 border-green-400
        !block !visible
      `}>
        <div className="flex flex-col h-full relative">
          {/* Debug info */}
          <div className="bg-yellow-500 text-black p-2 text-xs">
            SIDEBAR DEBUG: isOpen={isOpen}, isCollapsed={isCollapsed}
          </div>
          
          {/* Header */}
          <div className="p-6 border-b-4 border-green-400 bg-green-500">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Beef className="h-10 w-10 text-white flex-shrink-0" />
                {!isCollapsed && (
                  <h2 className="text-2xl font-bold text-white">EasyRanch</h2>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {/* Collapse/Expand button - only visible on desktop */}
                <button
                  onClick={toggleCollapse}
                  className="hidden lg:block p-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors"
                  title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
                {/* Close button - only visible on mobile */}
                <button
                  onClick={onToggle}
                  className="lg:hidden p-2 text-white hover:bg-green-600 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
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
                  title={isCollapsed ? item.label : ""}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-green-500">
            {!isCollapsed && (
              <div className="text-center text-green-200 text-sm">
                Smart Farm Management
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 