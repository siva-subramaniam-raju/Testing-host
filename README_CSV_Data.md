# Smart Farm Cow Monitoring Dashboard - CSV Data Files

This directory contains comprehensive CSV data files with fake data for the Smart Farm Cow Monitoring Dashboard. These files provide realistic datasets that match the application's data structure and can be used for testing, development, or demonstration purposes.

## CSV Files Overview

### 1. `cow_details.csv`
**Primary cow information and health metrics**
- **CowID**: Unique identifier for each cow
- **Name**: Cow's given name
- **Breed**: Cow breed (Holstein, Jersey, Guernsey)
- **Age**: Age in years
- **Weight**: Weight in kg
- **HealthScore**: Health score percentage (0-100)
- **Temperature**: Body temperature in Celsius
- **ActivityLevel**: Activity level (normal, high, low)
- **ReproductiveStatus**: Current reproductive status
- **LastCalving**: Date of last calving
- **NextExpectedCalving**: Expected calving date
- **DailyMilkProduction**: Daily milk production in liters
- **AverageRumination**: Average rumination time in hours
- **LastCheckup**: Date of last health checkup
- **Location**: Current barn and stall location
- **Status**: Current status (Active, Alert)

### 2. `pregnancy_status.csv`
**Reproductive tracking and breeding information**
- **CowID**: Unique identifier for each cow
- **Breed**: Cow breed
- **Status**: Pregnancy status (pregnant, heat, inseminated, open)
- **DaysInCycle**: Days in current reproductive cycle
- **LastInsemination**: Date of last artificial insemination
- **ExpectedCalving**: Expected calving date
- **Confidence**: Pregnancy probability percentage
- **Notes**: Additional breeding notes

### 3. `activity_feed.csv`
**Real-time activity monitoring data**
- **ActivityID**: Unique activity identifier
- **CowID**: Cow identifier
- **Breed**: Cow breed
- **Activity**: Type of activity (Eating, Ruminating, Walking, Lying, etc.)
- **Timestamp**: When the activity occurred
- **Type**: Activity type (normal, success, alert)
- **Description**: Detailed activity description
- **Duration**: Activity duration in minutes
- **Location**: Where the activity occurred

### 4. `alerts.csv`
**System alerts and notifications**
- **AlertID**: Unique alert identifier
- **Type**: Alert type (health, breeding, behavior, system)
- **Priority**: Alert priority (high, medium, low)
- **Message**: Alert message
- **CowID**: Associated cow (if applicable)
- **Breed**: Cow breed (if applicable)
- **Timestamp**: When alert was generated
- **Resolved**: Whether alert has been resolved
- **Details**: Detailed alert information

### 5. `barn_positions.csv`
**Real-time barn location and status data**
- **CowID**: Unique cow identifier
- **Breed**: Cow breed
- **X_Position**: X coordinate in barn (percentage)
- **Y_Position**: Y coordinate in barn (percentage)
- **Status**: Current status (resting, alert, feeding, active)
- **Temperature**: Current body temperature
- **LastUpdate**: Last position update timestamp

### 6. `health_history.csv`
**Historical health records and veterinary visits**
- **RecordID**: Unique record identifier
- **CowID**: Cow identifier
- **Breed**: Cow breed
- **Date**: Date of health event
- **Event**: Type of health event
- **Status**: Event status (Good, Completed, Alert, Confirmed)
- **Notes**: Additional health notes
- **Veterinarian**: Attending veterinarian

### 7. `milk_production.csv`
**Daily milk production tracking**
- **RecordID**: Unique production record identifier
- **CowID**: Cow identifier
- **Breed**: Cow breed
- **Date**: Production date
- **MorningProduction**: Morning milking production (liters)
- **AfternoonProduction**: Afternoon milking production (liters)
- **EveningProduction**: Evening milking production (liters)
- **TotalDailyProduction**: Total daily production (liters)
- **QualityScore**: Milk quality score (0-100)
- **Notes**: Production notes

### 8. `sensor_data.csv`
**IoT sensor readings and environmental data**
- **SensorID**: Unique sensor identifier
- **Location**: Sensor location
- **SensorType**: Type of sensor (Temperature, Activity, Rumination, etc.)
- **Reading**: Sensor reading value
- **Unit**: Unit of measurement
- **Timestamp**: When reading was taken
- **Status**: Sensor status (Active, Alert)
- **BatteryLevel**: Sensor battery level percentage
- **Notes**: Additional sensor notes

## Data Characteristics

### Cow Population
- **Total Cows**: 20 cows
- **Breeds**: Holstein, Jersey, Guernsey
- **Age Range**: 2-6 years
- **Health Scores**: 78-96%
- **Temperature Range**: 38.3-39.5°C

### Activity Patterns
- **Normal Activities**: Eating, Ruminating, Walking, Lying
- **Alert Activities**: Abnormal behavior, Excessive lying
- **Success Activities**: Good rumination patterns, Heat detection

### Alert Distribution
- **Health Alerts**: 40% (temperature, rumination, respiratory)
- **Breeding Alerts**: 30% (heat cycles, insemination timing)
- **Behavior Alerts**: 20% (activity levels, movement patterns)
- **System Alerts**: 10% (sensor issues, connectivity)

### Production Metrics
- **Daily Production Range**: 21.5-30.2 liters
- **Quality Scores**: 78-96%
- **Milking Sessions**: 3 per day (Morning, Afternoon, Evening)

## Usage Instructions

1. **Import into Database**: These CSV files can be imported into any database system (MySQL, PostgreSQL, SQLite, etc.)
2. **Data Analysis**: Use for testing analytics and reporting features
3. **Development**: Use as sample data for application development
4. **Demonstration**: Use for showcasing dashboard capabilities

## Data Relationships

- **CowID** is the primary key that links most tables together
- **Breed** information is consistent across all tables
- **Timestamp** data is synchronized for realistic time-based analysis
- **Location** data corresponds to the barn heatmap visualization

## Notes

- All data is fictional and generated for demonstration purposes
- Timestamps are set to February 29, 2024 for consistency
- Health scores and production metrics follow realistic dairy farm patterns
- Sensor data includes environmental monitoring for comprehensive farm management

## File Formats

All files are in standard CSV format with:
- Comma-separated values
- Header row with column names
- UTF-8 encoding
- Consistent date format (YYYY-MM-DD)
- Consistent time format (HH:MM:SS) 