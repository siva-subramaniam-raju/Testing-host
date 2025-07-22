import React from 'react';

const BehavioralIndicators: React.FC = () => {
  const pregnantData = [85, 65, 45, 75, 90]; // Activity, Resting, Feeding, Social, Movement
  const nonPregnantData = [70, 80, 60, 85, 75];

  const maxValue = 100;
  const centerX = 96;
  const centerY = 96;
  const radius = 80;

  const createPolygonPoints = (data: number[]) => {
    return data.map((value, index) => {
      const angle = (index * 72 - 90) * (Math.PI / 180); // 72 degrees per axis, start from top
      const distance = (value / maxValue) * radius;
      const x = centerX + distance * Math.cos(angle);
      const y = centerY + distance * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const pregnantPoints = createPolygonPoints(pregnantData);
  const nonPregnantPoints = createPolygonPoints(nonPregnantData);

  const axisLabels = [
    { text: 'Activity Level', x: centerX, y: centerY - radius - 25, angle: -90 },
    { text: 'Resting Time', x: centerX + radius + 25, y: centerY - 40, angle: 18 },
    { text: 'Feeding Pattern', x: centerX + 40, y: centerY + radius + 25, angle: 90 },
    { text: 'Social Interaction', x: centerX - radius - 25, y: centerY - 40, angle: 162 },
    { text: 'Movement Range', x: centerX - 40, y: centerY - radius - 25, angle: -162 }
  ];

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Behavioral Indicators</h2>
        <button className="dashboard-button secondary">Details</button>
      </div>
      
      <div className="chart-container relative w-full h-80">
        <div className="radar-chart">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 relative">
              {/* Background circles */}
              <div className="radar-circle absolute" style={{ width: '20%', height: '20%', top: '40%', left: '40%' }}></div>
              <div className="radar-circle absolute" style={{ width: '40%', height: '40%', top: '30%', left: '30%' }}></div>
              <div className="radar-circle absolute" style={{ width: '60%', height: '60%', top: '20%', left: '20%' }}></div>
              <div className="radar-circle absolute" style={{ width: '80%', height: '80%', top: '10%', left: '10%' }}></div>
              <div className="radar-circle absolute" style={{ width: '100%', height: '100%', top: '0%', left: '0%' }}></div>
              
              {/* Axis labels with better positioning */}
              {axisLabels.map((label, index) => (
                <div
                  key={index}
                  className="absolute text-xs font-medium text-gray-700 bg-white px-1 py-0.5 rounded"
                  style={{
                    left: label.x,
                    top: label.y,
                    transform: 'translate(-50%, -50%)',
                    whiteSpace: 'nowrap',
                    zIndex: 10
                  }}
                >
                  {label.text}
                </div>
              ))}
              
              {/* Radar chart polygons */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 192">
                <polygon 
                  points={pregnantPoints} 
                  className="radar-polygon pregnant"
                />
                <polygon 
                  points={nonPregnantPoints} 
                  className="radar-polygon non-pregnant"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-600">Pregnant Cows (Avg)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-600">Non-Pregnant Cows (Avg)</span>
        </div>
      </div>
    </div>
  );
};

export default BehavioralIndicators; 