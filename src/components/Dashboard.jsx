import React, { useState } from 'react';
import Header from './Header.jsx';
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

  return (
    <div className="min-h-screen main-bg">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview Section */}
        <div className="mb-8">
          <DashboardOverview />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ActivityFeed />
              <AlertsPanel />
            </div>
            
            <BarnHeatmap onCowSelect={setSelectedCow} />
            <AnalyticsCharts />
            
            {/* New Sections */}
            <CowsRequiringAttention />
            <BehavioralTrendsCorrelation />
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            <PregnancyStatus />
            <CowProfiles onCowSelect={setSelectedCow} />
          </div>
        </div>
      </main>
      
      {selectedCow && (
        <CowDetails cowId={selectedCow} onClose={() => setSelectedCow(null)} />
      )}
    </div>
  );
};

export default Dashboard; 