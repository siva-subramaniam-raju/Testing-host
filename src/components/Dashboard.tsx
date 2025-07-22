import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Header from './Header.jsx';
import Sidebar from './Sidebar';
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
import { DashboardProps } from '../types';
import dataService from '../services/dataService';

const Dashboard: React.FC<DashboardProps> = () => {
  const [selectedCow, setSelectedCow] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboardData, setDashboardData] = useState<{
    metrics?: any;
    activityFeed?: any[];
    alerts?: any[];
    cowProfiles?: any[];
    barnPositions?: any[];
    pregnancyData?: any[];
    attentionCows?: any[];
    analyticsData?: any;
  }>({});

  // Load dashboard data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [
          metrics,
          activityFeed,
          alerts,
          cowProfiles,
          barnPositions,
          pregnancyData,
          attentionCows,
          analyticsData
        ] = await Promise.all([
          dataService.getDashboardMetrics(),
          dataService.getActivityFeed(),
          dataService.getAlerts(),
          dataService.getCowProfiles(),
          dataService.getBarnPositions(),
          dataService.getPregnancyData(),
          dataService.getCowsRequiringAttention(),
          dataService.getAnalyticsData()
        ]);

        setDashboardData({
          metrics,
          activityFeed,
          alerts,
          cowProfiles,
          barnPositions,
          pregnancyData,
          attentionCows,
          analyticsData
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const renderSection = (): React.ReactElement => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard data...</p>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'overview':
        return <DashboardOverview metrics={dashboardData.metrics} />;
              case 'activity':
          return <ActivityFeed activities={dashboardData.activityFeed} onCowSelect={setSelectedCow} />;
      case 'alerts':
        return <AlertsPanel alerts={dashboardData.alerts} />;
      case 'cows':
        return <CowProfiles cows={dashboardData.cowProfiles} onCowSelect={setSelectedCow} />;
      case 'analytics':
        return <AnalyticsCharts data={dashboardData.analyticsData} />;
      case 'barn':
        return <BarnHeatmap positions={dashboardData.barnPositions} onCowSelect={setSelectedCow} />;
      case 'pregnancy':
        return <PregnancyStatus data={dashboardData.pregnancyData} />;
      case 'trends':
        return <BehavioralTrendsCorrelation data={dashboardData.analyticsData} />;
      case 'attention':
        return <CowsRequiringAttention cows={dashboardData.attentionCows} />;
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
                    <ActivityFeed activities={dashboardData.activityFeed} onCowSelect={setSelectedCow} />
                  </div>
                  <div className="md:col-span-1">
                    <AlertsPanel alerts={dashboardData.alerts} />
                  </div>
                </div>
                
                {/* Barn heatmap - full width */}
                <div className="w-full">
                  <BarnHeatmap positions={dashboardData.barnPositions} onCowSelect={setSelectedCow} />
                </div>
                
                {/* Analytics - full width */}
                <div className="w-full">
                  <AnalyticsCharts data={dashboardData.analyticsData} />
                </div>
                
                {/* Attention and trends - stacked on mobile, side by side on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <CowsRequiringAttention cows={dashboardData.attentionCows} />
                  <BehavioralTrendsCorrelation data={dashboardData.analyticsData} />
                </div>
              </div>
              
              {/* Right Column - Full width on mobile, 1/3 on desktop */}
              <div className="space-y-4 lg:space-y-6">
                <PregnancyStatus data={dashboardData.pregnancyData} />
                <CowProfiles cows={dashboardData.cowProfiles} onCowSelect={setSelectedCow} />
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
        isCollapsed={sidebarCollapsed}
        onCollapseChange={setSidebarCollapsed}
      />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <Header 
          onSectionChange={setActiveSection}
          activeSection={activeSection}
        />
        
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
        <CowDetails 
          cowId={selectedCow} 
          cowData={dashboardData.cowProfiles?.find((cow: any) => cow.id === selectedCow)}
          onClose={() => setSelectedCow(null)} 
        />
      )}
    </div>
  );
};

export default Dashboard; 