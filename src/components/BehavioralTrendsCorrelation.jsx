import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Bed, Utensils, Thermometer, Mic, Users, FileText, Eye, BarChart3, Info, X } from 'lucide-react';

const BehavioralTrendsCorrelation = () => {
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const behavioralData = [
    {
      name: 'Activity Level',
      icon: Activity,
      correlation: -0.78,
      summary: '15% decrease in pregnant cows',
      currentValue: '4.2k Avg steps/day',
      changeFromBaseline: '-12%',
      isPositive: false,
      details: {
        description: 'Activity level shows strong negative correlation with pregnancy status',
        pregnantAvg: '3.8k steps/day',
        nonPregnantAvg: '4.9k steps/day',
        significance: 'High',
        recommendation: 'Monitor activity patterns for early pregnancy detection'
      }
    },
    {
      name: 'Resting Time',
      icon: Bed,
      correlation: 0.85,
      summary: '22% increase in pregnant cows',
      currentValue: '9.8h Avg rest/day',
      changeFromBaseline: '+18%',
      isPositive: true,
      details: {
        description: 'Resting time shows strong positive correlation with pregnancy',
        pregnantAvg: '10.2h rest/day',
        nonPregnantAvg: '8.1h rest/day',
        significance: 'Very High',
        recommendation: 'Use resting patterns as primary pregnancy indicator'
      }
    },
    {
      name: 'Feeding Pattern',
      icon: Utensils,
      correlation: 0.18,
      summary: '6% decrease in feeding time',
      currentValue: '4.7h/day Avg feeding/day',
      changeFromBaseline: '-4%',
      isPositive: false,
      details: {
        description: 'Feeding patterns show weak positive correlation',
        pregnantAvg: '4.5h feeding/day',
        nonPregnantAvg: '4.8h feeding/day',
        significance: 'Low',
        recommendation: 'Monitor for significant changes in feeding behavior'
      }
    },
    {
      name: 'Heat Detection',
      icon: Thermometer,
      correlation: -0.81,
      summary: 'Heat signs dropped post-insemination',
      currentValue: '-78% Heat behavior reduction',
      changeFromBaseline: '4 days Since last heat',
      isPositive: false,
      details: {
        description: 'Heat detection shows strong negative correlation with pregnancy',
        pregnantAvg: '0 heat signs/day',
        nonPregnantAvg: '3.2 heat signs/day',
        significance: 'Very High',
        recommendation: 'Use heat detection as reliable pregnancy indicator'
      }
    },
    {
      name: 'Vocalization',
      icon: Mic,
      correlation: -0.26,
      summary: '8% decrease in vocal activity',
      currentValue: '8 calls/day Avg vocalizations',
      changeFromBaseline: '-6%',
      isPositive: false,
      details: {
        description: 'Vocalization shows weak negative correlation',
        pregnantAvg: '7.2 calls/day',
        nonPregnantAvg: '8.5 calls/day',
        significance: 'Low',
        recommendation: 'Monitor for unusual vocalization patterns'
      }
    },
    {
      name: 'Social Interaction',
      icon: Users,
      correlation: -0.65,
      summary: '18% decrease in interactions',
      currentValue: '42 Avg interactions/day',
      changeFromBaseline: '-14%',
      isPositive: false,
      details: {
        description: 'Social interaction shows moderate negative correlation',
        pregnantAvg: '35 interactions/day',
        nonPregnantAvg: '48 interactions/day',
        significance: 'Medium',
        recommendation: 'Track social behavior changes for pregnancy detection'
      }
    }
  ];

  const getCorrelationColor = (correlation) => {
    if (correlation >= 0.5) return 'text-green-600';
    if (correlation <= -0.5) return 'text-red-600';
    return 'text-orange-600';
  };

  const getSummaryColor = (isPositive) => {
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  const getCorrelationSign = (correlation) => {
    return correlation >= 0 ? '+' : '';
  };

  const getSignificanceColor = (significance) => {
    switch (significance) {
      case 'Very High':
        return 'bg-green-100 text-green-800';
      case 'High':
        return 'bg-blue-100 text-blue-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (behavior) => {
    setSelectedBehavior(behavior);
    setShowDetails(true);
  };

  return (
    <div className="dashboard-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Behavioral Trends & Pregnancy Correlation</h2>
        <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors">
          <FileText className="w-4 h-4" />
          <span>View Full Report</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {behavioralData.map((behavior, index) => {
          const Icon = behavior.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-farm hover:shadow-md transition-all cursor-pointer group" onClick={() => handleViewDetails(behavior)}>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Icon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{behavior.name}</h3>
                  <p className={`text-sm font-semibold ${getCorrelationColor(behavior.correlation)}`}>
                    {getCorrelationSign(behavior.correlation)}{behavior.correlation}
                  </p>
                </div>
                <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              
              <div className="space-y-2">
                <p className={`text-sm ${getSummaryColor(behavior.isPositive)} flex items-center space-x-1`}>
                  {behavior.isPositive ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span>{behavior.summary}</span>
                </p>
                
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{behavior.currentValue}</p>
                  <p className="text-xs text-gray-500">{behavior.changeFromBaseline}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {showDetails && selectedBehavior && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <selectedBehavior.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedBehavior.name}</h3>
                    <p className={`text-sm font-semibold ${getCorrelationColor(selectedBehavior.correlation)}`}>
                      Correlation: {getCorrelationSign(selectedBehavior.correlation)}{selectedBehavior.correlation}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedBehavior.details.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Pregnant Cows Average</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedBehavior.details.pregnantAvg}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Non-Pregnant Cows Average</h4>
                    <p className="text-2xl font-bold text-blue-600">{selectedBehavior.details.nonPregnantAvg}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Significance:</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSignificanceColor(selectedBehavior.details.significance)}`}>
                    {selectedBehavior.details.significance}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Recommendation</h4>
                  <p className="text-gray-600">{selectedBehavior.details.recommendation}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    View Detailed Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehavioralTrendsCorrelation; 