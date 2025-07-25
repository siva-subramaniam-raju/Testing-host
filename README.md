# 🐄 Smart Farm Cow Monitoring Dashboard

A modern, responsive web application for monitoring cow health, activity, and farm management with enhanced visual features including breed-specific cow illustrations.

## ✨ Features

### 🎯 Core Functionality
- **Real-time Activity Monitoring** - Track cow activities like feeding, ruminating, walking, and resting
- **Health Score Tracking** - Monitor individual cow health metrics and temperature
- **Pregnancy Status Management** - Track reproductive cycles and calving schedules
- **Smart Alerts System** - Get notified of health issues, breeding windows, and system alerts
- **Barn Layout Visualization** - Interactive heatmap showing cow positions and status
- **Analytics Dashboard** - Daily trends for activity, rumination, and temperature
- **Cows Requiring Attention** - Table showing cows that need immediate attention
- **Behavioral Trends & Pregnancy Correlation** - Analysis of behavioral patterns and pregnancy correlation

### 🎨 Enhanced Visual Features
- **Breed-Specific Cow Illustrations** - Different cow images for Holstein, Jersey, and Guernsey breeds
- **Interactive Cow Profiles** - Click to view detailed information with large cow images
- **Visual Activity Feed** - Each activity entry includes the corresponding cow's breed illustration
- **Modern UI/UX** - Clean, responsive design with Tailwind CSS

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with JSX
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
├── public/
│   ├── cow-holstein.svg      # Holstein breed illustration
│   ├── cow-jersey.svg        # Jersey breed illustration
│   ├── cow-guernsey.svg      # Guernsey breed illustration
│   └── cow-icon.svg          # General cow icon
├── src/
│   ├── components/
│   │   ├── CowImage.jsx              # Reusable cow image component
│   │   ├── Header.jsx                # Header with cow branding
│   │   ├── CowProfiles.jsx           # Cow profiles with images
│   │   ├── ActivityFeed.jsx          # Activity feed with cow images
│   │   ├── CowDetails.jsx            # Detailed cow view
│   │   ├── Dashboard.jsx             # Main dashboard
│   │   ├── CowsRequiringAttention.jsx # Cows requiring attention table
│   │   ├── BehavioralTrendsCorrelation.jsx # Behavioral trends analysis
│   │   ├── DashboardOverview.jsx     # Dashboard overview with metrics
│   │   └── [Other Components]        # Additional components
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point
│   └── index.css                     # Global styles
└── README.md
```

## 🎯 Key Components

### Dashboard Components
- **`Dashboard.jsx`** - Main dashboard with all sections
- **`DashboardOverview.jsx`** - Key metrics and charts
- **`CowsRequiringAttention.jsx`** - Table of cows needing attention
- **`BehavioralTrendsCorrelation.jsx`** - Behavioral analysis cards
- **`CowProfiles.jsx`** - Cow profiles with breed images
- **`ActivityFeed.jsx`** - Activity feed with cow illustrations
- **`CowDetails.jsx`** - Detailed view with large cow image

### Supporting Components
- **`Header.jsx`** - Header component
- **`AlertsPanel.jsx`** - Alerts and notifications
- **`BarnHeatmap.jsx`** - Interactive barn layout
- **`AnalyticsCharts.jsx`** - Data visualization
- **`PregnancyStatus.jsx`** - Reproductive tracking

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## 🎨 Cow Breeds Supported

- **Holstein** - Black and white spotted cows
- **Jersey** - Light brown cows
- **Guernsey** - Golden brown cows with additional markings
- **Default** - Generic cow icon for unknown breeds

## 📊 Dashboard Features

### Real-time Monitoring
- Live activity feed with cow illustrations
- Health score tracking with color-coded indicators
- Temperature monitoring with alerts
- Activity level classification (low, normal, high)

### Farm Management
- Interactive barn layout with cow positions
- Pregnancy status tracking
- Breeding cycle management
- Health history records

### Analytics
- Daily trends for activity, rumination, and temperature
- Peak and average calculations
- Visual charts and graphs
- Historical data tracking

### New Features
- **Cows Requiring Attention** - Monitor cows that need immediate care
- **Behavioral Trends Analysis** - Understand correlation between behavior and pregnancy
- **Dashboard Overview** - Key metrics and visual indicators

## 🔧 Configuration

The application uses:
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **ESLint** for code quality

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 📄 License

This project is licensed under the MIT License.

---

**🐄 Made with ❤️ for Smart Farming**#   E a s y R a n c h T e s t  
 