import React from 'react';
import { FileText, Activity, Bed, Utensils, Thermometer, Mic, Users, Eye, TrendingDown, TrendingUp } from 'lucide-react';

interface CorrelationMetric {
  id: string;
  title: string;
  correlation: number;
  insight: string;
  averageValue: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
}

const BehavioralTrendsCorrelation: React.FC = () => {
  const metrics: CorrelationMetric[] = [
    {
      id: '1',
      title: 'Activity Level',
      correlation: -0.78,
      insight: '15% decrease in pregnant cows',
      averageValue: '4.2k Avg steps/day',
      change: '-12%',
      changeType: 'decrease',
      icon: <Activity className="w-5 h-5 text-green-600" />
    },
    {
      id: '2',
      title: 'Resting Time',
      correlation: 0.85,
      insight: '22% increase in pregnant cows',
      averageValue: '9.8h Avg rest/day',
      change: '+18%',
      changeType: 'increase',
      icon: <Bed className="w-5 h-5 text-green-600" />
    },
    {
      id: '3',
      title: 'Feeding Pattern',
      correlation: 0.18,
      insight: '6% decrease in feeding time',
      averageValue: '4.7h/day Avg feeding/day',
      change: '-4%',
      changeType: 'decrease',
      icon: <Utensils className="w-5 h-5 text-green-600" />
    },
    {
      id: '4',
      title: 'Heat Detection',
      correlation: -0.81,
      insight: 'Heat signs dropped post-insemination',
      averageValue: '-78% Heat behavior reduction',
      change: '4 days Since last heat',
      changeType: 'decrease',
      icon: <Thermometer className="w-5 h-5 text-green-600" />
    },
    {
      id: '5',
      title: 'Vocalization',
      correlation: -0.26,
      insight: '8% decrease in vocal activity',
      averageValue: '8 calls/day Avg vocalizations',
      change: '-6%',
      changeType: 'decrease',
      icon: <Mic className="w-5 h-5 text-green-600" />
    },
    {
      id: '6',
      title: 'Social Interaction',
      correlation: -0.65,
      insight: '18% decrease in interactions',
      averageValue: '42 Avg interactions/day',
      change: '-14%',
      changeType: 'decrease',
      icon: <Users className="w-5 h-5 text-green-600" />
    }
  ];

  const getCorrelationColor = (correlation: number) => {
    if (correlation > 0) return 'text-green-600';
    if (correlation < 0) return 'text-red-600';
    return 'text-orange-600';
  };

  const getInsightColor = (changeType: string) => {
    return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
  };

  const getInsightIcon = (changeType: string) => {
    return changeType === 'increase' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
  };

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Behavioral Trends & Pregnancy Correlation</h2>
        <button className="dashboard-button secondary">
          <FileText className="dashboard-icon" />
          <span>View Full Report</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div 
            key={metric.id}
            className="summary-card p-4 cursor-pointer group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                {metric.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{metric.title}</h3>
                <p className={`text-sm font-semibold ${getCorrelationColor(metric.correlation)}`}>
                  {metric.correlation > 0 ? '+' : ''}{metric.correlation.toFixed(2)}
                </p>
              </div>
              <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            
            <div className="space-y-2">
              <p className={`text-sm ${getInsightColor(metric.changeType)} flex items-center space-x-1`}>
                {getInsightIcon(metric.changeType)}
                <span>{metric.insight}</span>
              </p>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{metric.averageValue}</p>
                <p className="text-xs text-gray-500">{metric.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BehavioralTrendsCorrelation; 