// Data service for loading and parsing CSV data
interface CSVData {
  [key: string]: string;
}

interface DashboardMetrics {
  totalCows: number;
  pregnantCows: number;
  accuracy: number;
  attentionNeeded: number;
  trends: {
    totalCows: string;
    pregnantCows: string;
    accuracy: string;
    attentionNeeded: string;
  };
}

interface ActivityItem {
  id: string;
  cowId: string;
  activity: string;
  timestamp: string;
  type: string;
  description: string;
  duration: string;
  location: string;
  cowName: string;
  breed: string;
}

interface Alert {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  severity: string;
  status: 'active' | 'resolved';
  cowId?: string;
  details: string;
}

interface CowProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  status: 'healthy' | 'attention' | 'critical';
  lastActivity: string;
  temperature: number;
  activityLevel: string;
  healthScore: number;
  reproductiveStatus: string;
  location: string;
  milkProduction: number;
}

interface BarnPosition {
  id: string;
  x: number;
  y: number;
  cowId: string;
  temperature: number;
  status: string;
  cowName: string;
  breed: string;
}

interface PregnancyData {
  cowId: string;
  status: string;
  daysInCycle: number;
  lastInsemination?: string;
  expectedCalving?: string;
  confidence: number;
  breed: string;
}

interface CowRequiringAttention {
  id: string;
  name: string;
  issue: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  status: string;
  breed: string;
  temperature: number;
  healthScore: number;
}

interface AnalyticsData {
  activityTrends: {
    average: number;
    peak: number;
    low: number;
  };
  temperatureTrends: {
    average: number;
    peak: number;
    low: number;
  };
  ruminationTrends: {
    average: number;
    peak: number;
    low: number;
  };
  totalCows: number;
  activeCows: number;
  alertCows: number;
}

class DataService {
  private cache: Map<string, CSVData[]>;
  private baseUrl: string;

  constructor() {
    this.cache = new Map();
    this.baseUrl = '/'; // Adjust if your CSV files are in a different location
  }

  async loadCSV(filename: string): Promise<CSVData[]> {
    if (this.cache.has(filename)) {
      return this.cache.get(filename)!;
    }

    try {
      const response = await fetch(`${this.baseUrl}${filename}`);
      const csvText = await response.text();
      const data = this.parseCSV(csvText);
      this.cache.set(filename, data);
      return data;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return [];
    }
  }

  parseCSV(csvText: string): CSVData[] {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const data: CSVData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = this.parseCSVLine(lines[i]);
      const row: CSVData = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }

    return data;
  }

  parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  // Dashboard Overview Data
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const cowData = await this.loadCSV('cow_details.csv');
    
    const totalCows = cowData.length;
    const pregnantCows = cowData.filter(cow => 
      cow.ReproductiveStatus === 'Pregnant' || cow.ReproductiveStatus === 'Inseminated'
    ).length;
    const attentionNeeded = cowData.filter(cow => cow.Status === 'Alert').length;
    
    // Calculate prediction accuracy (simplified)
    const accuracy = 92.4; // This could be calculated from historical data
    
    return {
      totalCows,
      pregnantCows,
      accuracy,
      attentionNeeded,
      trends: {
        totalCows: '+12% from last month',
        pregnantCows: '+5% from last week',
        accuracy: '+2.1% improvement',
        attentionNeeded: '↓3 resolved'
      }
    };
  }

  // Activity Feed Data
  async getActivityFeed(): Promise<ActivityItem[]> {
    const activityData = await this.loadCSV('activity_feed.csv');
    const cowData = await this.loadCSV('cow_details.csv');
    
    return activityData.slice(0, 10).map(activity => {
      const cow = cowData.find(c => c.CowID === activity.CowID);
      return {
        id: activity.ActivityID,
        cowId: activity.CowID,
        activity: activity.Activity,
        timestamp: this.formatTimestamp(activity.Timestamp),
        type: activity.Type,
        description: activity.Description,
        duration: activity.Duration,
        location: activity.Location,
        cowName: cow?.Name || 'Unknown',
        breed: activity.Breed
      };
    });
  }

  formatTimestamp(timestamp: string): string {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''} ago`;
  }

  // Alerts Data
  async getAlerts(): Promise<Alert[]> {
    const alertsData = await this.loadCSV('alerts.csv');
    
    return alertsData.filter(alert => alert.Resolved === 'false').map(alert => ({
      id: alert.AlertID,
      type: alert.Type,
      message: alert.Message,
      timestamp: alert.Timestamp,
      severity: alert.Priority,
      status: alert.Resolved === 'true' ? 'resolved' : 'active',
      cowId: alert.CowID || undefined,
      details: alert.Details
    }));
  }

  // Cow Profiles Data
  async getCowProfiles(): Promise<CowProfile[]> {
    const cowData = await this.loadCSV('cow_details.csv');
    
    return cowData.map(cow => ({
      id: cow.CowID,
      name: cow.Name,
      breed: cow.Breed,
      age: parseInt(cow.Age),
      status: cow.Status === 'Alert' ? 'critical' : cow.Status === 'Active' ? 'healthy' : 'attention',
      lastActivity: cow.LastCheckup,
      temperature: parseFloat(cow.Temperature),
      activityLevel: cow.ActivityLevel,
      healthScore: parseInt(cow.HealthScore),
      reproductiveStatus: cow.ReproductiveStatus,
      location: cow.Location,
      milkProduction: parseFloat(cow.DailyMilkProduction)
    }));
  }

  // Barn Positions Data
  async getBarnPositions(): Promise<BarnPosition[]> {
    const barnData = await this.loadCSV('barn_positions.csv');
    const cowData = await this.loadCSV('cow_details.csv');
    
    return barnData.map(position => {
      const cow = cowData.find(c => c.CowID === position.CowID);
      return {
        id: position.PositionID,
        x: parseInt(position.X),
        y: parseInt(position.Y),
        cowId: position.CowID,
        temperature: parseFloat(position.Temperature),
        status: position.Status,
        cowName: cow?.Name || 'Unknown',
        breed: cow?.Breed || 'Unknown'
      };
    });
  }

  // Pregnancy Status Data
  async getPregnancyData(): Promise<PregnancyData[]> {
    const cowData = await this.loadCSV('cow_details.csv');
    
    const pregnancyData = cowData
      .filter(cow => ['Pregnant', 'Inseminated', 'Heat', 'Open'].includes(cow.ReproductiveStatus))
      .map(cow => {
        const lastInsemination = cow.ReproductiveStatus === 'Inseminated' ? cow.LastCalving : undefined;
        const expectedCalving = cow.NextExpectedCalving;
        
        // Calculate days in cycle (simplified)
        const daysInCycle = cow.ReproductiveStatus === 'Pregnant' ? 
          Math.floor((new Date().getTime() - new Date(cow.LastCalving).getTime()) / (1000 * 60 * 60 * 24)) : 0;
        
        return {
          cowId: cow.CowID,
          status: cow.ReproductiveStatus.toLowerCase(),
          daysInCycle,
          lastInsemination,
          expectedCalving,
          confidence: cow.ReproductiveStatus === 'Pregnant' ? 95 : 70,
          breed: cow.Breed
        };
      });
    
    return pregnancyData;
  }

  // Cows Requiring Attention
  async getCowsRequiringAttention(): Promise<CowRequiringAttention[]> {
    const cowData = await this.loadCSV('cow_details.csv');
    const alertsData = await this.loadCSV('alerts.csv');
    
    const attentionCows = cowData
      .filter(cow => cow.Status === 'Alert')
      .map(cow => {
        const cowAlerts = alertsData.filter(alert => alert.CowID === cow.CowID);
        const priority = cowAlerts.some(alert => alert.Priority === 'high') ? 'high' : 
                       cowAlerts.some(alert => alert.Priority === 'medium') ? 'medium' : 'low';
        
        return {
          id: cow.CowID,
          name: cow.Name,
          issue: cowAlerts.length > 0 ? cowAlerts[0].Message : 'Health monitoring required',
          priority: priority as 'low' | 'medium' | 'high',
          timestamp: cowAlerts.length > 0 ? cowAlerts[0].Timestamp : cow.LastCheckup,
          status: 'pending',
          breed: cow.Breed,
          temperature: parseFloat(cow.Temperature),
          healthScore: parseInt(cow.HealthScore)
        };
      });
    
    return attentionCows;
  }

  // Analytics Data
  async getAnalyticsData(): Promise<AnalyticsData> {
    const cowData = await this.loadCSV('cow_details.csv');
    
    const activityTrends = {
      average: cowData.reduce((sum, cow) => {
        const level = cow.ActivityLevel === 'high' ? 3 : cow.ActivityLevel === 'normal' ? 2 : 1;
        return sum + level;
      }, 0) / cowData.length,
      peak: Math.max(...cowData.map(cow => 
        cow.ActivityLevel === 'high' ? 3 : cow.ActivityLevel === 'normal' ? 2 : 1
      )),
      low: Math.min(...cowData.map(cow => 
        cow.ActivityLevel === 'high' ? 3 : cow.ActivityLevel === 'normal' ? 2 : 1
      ))
    };
    
    const temperatureTrends = {
      average: cowData.reduce((sum, cow) => sum + parseFloat(cow.Temperature), 0) / cowData.length,
      peak: Math.max(...cowData.map(cow => parseFloat(cow.Temperature))),
      low: Math.min(...cowData.map(cow => parseFloat(cow.Temperature)))
    };
    
    const ruminationTrends = {
      average: cowData.reduce((sum, cow) => sum + parseFloat(cow.AverageRumination), 0) / cowData.length,
      peak: Math.max(...cowData.map(cow => parseFloat(cow.AverageRumination))),
      low: Math.min(...cowData.map(cow => parseFloat(cow.AverageRumination)))
    };
    
    return {
      activityTrends,
      temperatureTrends,
      ruminationTrends,
      totalCows: cowData.length,
      activeCows: cowData.filter(cow => cow.Status === 'Active').length,
      alertCows: cowData.filter(cow => cow.Status === 'Alert').length
    };
  }
}

export default new DataService(); 