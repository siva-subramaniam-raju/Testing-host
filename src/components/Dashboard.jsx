import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import ActivityFeed from './ActivityFeed.jsx';
import PregnancyStatus from './PregnancyStatus.jsx';
import CowProfiles from './CowProfiles.jsx';
import AlertsPanel from './AlertsPanel.jsx';
import BarnHeatmap from './BarnHeatmap.jsx';
import AnalyticsCharts from './AnalyticsCharts.jsx';
import CowDetails from './CowDetails.jsx';
import CowsRequiringAttention from './CowsRequiringAttention.jsx';
import BehavioralTrendsCorrelation from './BehavioralTrendsCorrelation.jsx';
import DashboardOverview from './DashboardOverview.jsx';

const Dashboard = () => {
  const [selectedCow, setSelectedCow] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed on mobile

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'activity':
        return <ActivityFeed />;
      case 'alerts':
        return <AlertsPanel />;
      case 'cows':
        return <CowProfiles onCowSelect={setSelectedCow} />;
      case 'analytics':
        return <AnalyticsCharts />;
      case 'barn':
        return <BarnHeatmap onCowSelect={setSelectedCow} />;
      case 'pregnancy':
        return <PregnancyStatus />;
      case 'trends':
        return <BehavioralTrendsCorrelation />;
      case 'attention':
        return <CowsRequiringAttention />;
      default:
        return (
          <div className="space-y-6">
            {/* Mobile-first grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {/* Left Column - Full width on mobile, 2/3 on desktop */}
              <div className="lg:col-span-2 space-y-4 lg:space-y-6">
                {/* Top row - 2 columns on mobile, 3 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div className="md:col-span-1">
                    <ActivityFeed />
                  </div>
                  <div className="md:col-span-1">
                    <AlertsPanel />
                  </div>
                </div>
                
                {/* Barn heatmap - full width */}
                <div className="w-full">
                  <BarnHeatmap onCowSelect={setSelectedCow} />
                </div>
                
                {/* Analytics - full width */}
                <div className="w-full">
                  <AnalyticsCharts />
                </div>
                
                {/* Attention and trends - stacked on mobile, side by side on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <CowsRequiringAttention />
                  <BehavioralTrendsCorrelation />
                </div>
              </div>
              
              {/* Right Column - Full width on mobile, 1/3 on desktop */}
              <div className="space-y-4 lg:space-y-6">
                <PregnancyStatus />
                <CowProfiles onCowSelect={setSelectedCow} />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen main-bg flex">
      {/* Mobile menu button - only visible on mobile */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 transition-all duration-300">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Page title for mobile */}
          <div className="lg:hidden mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeSection === 'overview' && 'Dashboard'}
              {activeSection === 'cows' && 'Cattle Monitor'}
              {activeSection === 'barn' && 'Barn Map'}
              {activeSection === 'activity' && 'Activity Feed'}
              {activeSection === 'pregnancy' && 'Pregnancy Tracker'}
              {activeSection === 'alerts' && 'Alerts'}
              {activeSection === 'analytics' && 'Health Analytics'}
              {activeSection === 'attention' && 'Attention Needed'}
              {activeSection === 'trends' && 'Behavioral Trends'}
            </h1>
          </div>
          
          {renderSection()}
        </main>
      </div>
      
      {/* Cow details modal */}
      {selectedCow && (
        <CowDetails cowId={selectedCow} onClose={() => setSelectedCow(null)} />
      )}
    </div>
  );
};

export default Dashboard; 