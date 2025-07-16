import React from 'react';
import { Bell, Settings, User, Wifi } from 'lucide-react';
import CowImage from './CowImage.jsx';

const EnhancedHeader = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <CowImage breed="holstein" size="medium" className="text-green-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">SmartFarm</h1>
                  <p className="text-sm text-gray-500">Cow Monitoring Dashboard</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-600">
              <Wifi className="w-4 h-4" />
              <span className="text-sm font-medium">Connected</span>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Farm Manager</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader; 