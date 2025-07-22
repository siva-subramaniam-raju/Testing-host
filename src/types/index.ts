// Sidebar Types
export interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

// Dashboard Types
export interface DashboardProps {}

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Header Types
export interface HeaderProps {}

// Pregnancy Status Types
export interface PregnancyData {
  cowId: string;
  status: 'pregnant' | 'heat' | 'inseminated' | 'open';
  daysInCycle: number;
  lastInsemination?: string;
  expectedCalving?: string;
  confidence: number;
}

export interface PregnancyStatusProps {}

// Dashboard Overview Types
export interface KeyMetric {
  title: string;
  value: string;
  trend: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

export interface PregnancyDataByBreed {
  pregnant: number;
  notPregnant: number;
  inconclusive: number;
}

export interface PregnancyDataByTime {
  [breed: string]: PregnancyDataByBreed;
}

export interface PregnancyDataByPeriod {
  week: PregnancyDataByTime;
  month: PregnancyDataByTime;
  quarter: PregnancyDataByTime;
}

export interface BehavioralData {
  activityLevel: number;
  restingTime: number;
  feedingPattern: number;
  socialInteraction: number;
  movementRange: number;
}

export interface BehavioralDataByStatus {
  pregnant: BehavioralData;
  nonPregnant: BehavioralData;
}

export interface TimeFilter {
  id: string;
  label: string;
}

export interface DashboardOverviewProps {}

// Activity Feed Types
export interface ActivityItem {
  id: string;
  type: 'feeding' | 'health' | 'movement' | 'alert';
  message: string;
  timestamp: string;
  cowId?: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface ActivityFeedProps {}

// Alerts Types
export interface Alert {
  id: string;
  type: 'health' | 'feeding' | 'movement' | 'system';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'resolved';
  cowId?: string;
}

export interface AlertsPanelProps {}

// Cow Types
export interface Cow {
  id: string;
  name: string;
  breed: string;
  age: number;
  status: 'healthy' | 'attention' | 'critical';
  lastActivity: string;
  temperature: number;
  activityLevel: number;
}

export interface CowProfilesProps {
  onCowSelect?: (cowId: string) => void;
}

export interface CowDetailsProps {
  cowId: string;
  onClose: () => void;
}

// Analytics Types
export interface AnalyticsChartsProps {}

// Barn Heatmap Types
export interface BarnPosition {
  id: string;
  x: number;
  y: number;
  cowId?: string;
  temperature: number;
  status: 'occupied' | 'empty' | 'attention';
}

export interface BarnHeatmapProps {
  onCowSelect?: (cowId: string) => void;
}

// Behavioral Trends Types
export interface BehavioralTrendsCorrelationProps {}

// Cows Requiring Attention Types
export interface CowRequiringAttention {
  id: string;
  name: string;
  issue: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  status: 'pending' | 'in-progress' | 'resolved';
}

export interface CowsRequiringAttentionProps {} 