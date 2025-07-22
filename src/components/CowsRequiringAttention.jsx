import React, { useState } from 'react';
import { AlertTriangle, Eye, Clock, Filter, SortAsc, SortDesc, ChevronRight } from 'lucide-react';

const CowsRequiringAttention = () => {
  const [sortBy, setSortBy] = useState('probability');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const cowsData = [
    {
      cowId: 'F-724',
      breed: 'Holstein',
      age: '4 years',
      lastCheck: '2h 16m ago',
      pregnancyProbability: 85,
      status: 'High Probability',
      statusColor: 'bg-green-100 text-green-700',
      temperature: 38.9,
      activityLevel: 'Normal',
      location: 'Barn A - Stall 12'
    },
    {
      cowId: 'J-312',
      breed: 'Jersey',
      age: '3 years',
      lastCheck: '1m ago',
      pregnancyProbability: 45,
      status: 'Inconclusive',
      statusColor: 'bg-orange-100 text-orange-700',
      temperature: 39.2,
      activityLevel: 'Low',
      location: 'Barn B - Stall 8'
    },
    {
      cowId: 'A-589',
      breed: 'Angus',
      age: '5 years',
      lastCheck: '22h 3m ago',
      pregnancyProbability: 15,
      status: 'Low Probability',
      statusColor: 'bg-red-100 text-red-700',
      temperature: 40.1,
      activityLevel: 'Very Low',
      location: 'Barn A - Stall 5'
    },
    {
      cowId: 'H-102',
      breed: 'Hereford',
      age: '2 years',
      lastCheck: 'Now',
      pregnancyProbability: 60,
      status: 'Needs Verification',
      statusColor: 'bg-orange-100 text-orange-700',
      temperature: 38.7,
      activityLevel: 'Normal',
      location: 'Barn C - Stall 3'
    },
    {
      cowId: 'G-456',
      breed: 'Guernsey',
      age: '4 years',
      lastCheck: '1h 16m ago',
      pregnancyProbability: 92,
      status: 'Very High Probability',
      statusColor: 'bg-green-100 text-green-700',
      temperature: 38.5,
      activityLevel: 'High',
      location: 'Barn B - Stall 15'
    }
  ];

  const breeds = ['all', ...Array.from(new Set(cowsData.map(cow => cow.breed)))];

  const getProgressBarColor = (probability) => {
    if (probability >= 80) return 'bg-green-500';
    if (probability >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleViewDetails = (cow) => {
    console.log('Viewing details for cow:', cow);
    // Here you would typically open a modal or navigate to a detail page
  };

  const filteredAndSortedCows = cowsData
    .filter(cow => selectedBreed === 'all' || cow.breed === selectedBreed)
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'probability':
          aValue = a.pregnancyProbability;
          bValue = b.pregnancyProbability;
          break;
        case 'lastCheck':
          // Convert time to minutes for sorting
          aValue = a.lastCheck === 'Now' ? 0 : parseInt(a.lastCheck.split('h')[0]) * 60;
          bValue = b.lastCheck === 'Now' ? 0 : parseInt(b.lastCheck.split('h')[0]) * 60;
          break;
        case 'temperature':
          aValue = a.temperature;
          bValue = b.temperature;
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  return (
    <div className="dashboard-card rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">Cows Requiring Attention</h2>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            <span className="text-xs sm:text-sm text-gray-600">{filteredAndSortedCows.length} cows</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-1 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors touch-target"
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors touch-target">
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View All Cattle</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg border-farm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 sm:flex-none">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Breed</label>
              <select 
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                className="w-full sm:w-auto px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {breeds.map(breed => (
                  <option key={breed} value={breed}>
                    {breed === 'all' ? 'All Breeds' : breed}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 sm:flex-none">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full sm:w-auto px-2 sm:px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="probability">Pregnancy Probability</option>
                <option value="lastCheck">Last Check</option>
                <option value="temperature">Temperature</option>
                <option value="breed">Breed</option>
              </select>
            </div>
            <button 
              onClick={() => handleSort(sortBy)}
              className="mt-4 sm:mt-6 p-2 text-gray-400 hover:text-gray-600 transition-colors touch-target"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('cowId')}>
                <div className="flex items-center space-x-1">
                  <span>Cow ID</span>
                  {sortBy === 'cowId' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />)}
                </div>
              </th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('breed')}>
                <div className="flex items-center space-x-1">
                  <span>Breed</span>
                  {sortBy === 'breed' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />)}
                </div>
              </th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('probability')}>
                <div className="flex items-center space-x-1">
                  <span>Probability</span>
                  {sortBy === 'probability' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />)}
                </div>
              </th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('temperature')}>
                <div className="flex items-center space-x-1">
                  <span>Temp</span>
                  {sortBy === 'temperature' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />)}
                </div>
              </th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700" onClick={() => handleSort('lastCheck')}>
                <div className="flex items-center space-x-1">
                  <span>Last Check</span>
                  {sortBy === 'lastCheck' && (sortOrder === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />)}
                </div>
              </th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span>Status</span>
              </th>
              <th className="text-left py-2 sm:py-3 px-1 sm:px-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span>Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAndSortedCows.map((cow) => (
              <tr key={cow.cowId} className="hover:bg-gray-50 transition-colors">
                <td className="py-2 sm:py-3 px-1 sm:px-2">
                  <div className="text-xs sm:text-sm font-medium text-gray-900">{cow.cowId}</div>
                  <div className="text-xs text-gray-500 truncate">{cow.location}</div>
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2">
                  <div className="text-xs sm:text-sm text-gray-900">{cow.breed}</div>
                  <div className="text-xs text-gray-500">{cow.age}</div>
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2">
                  <div className="text-xs sm:text-sm font-medium text-gray-900">{cow.pregnancyProbability}%</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-1">
                    <div
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${getProgressBarColor(cow.pregnancyProbability)}`}
                      style={{ width: `${cow.pregnancyProbability}%` }}
                    />
                  </div>
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2">
                  <div className="text-xs sm:text-sm font-medium text-gray-900">{cow.temperature}°C</div>
                  <div className="text-xs text-gray-500">{cow.activityLevel}</div>
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">{cow.lastCheck}</span>
                  </div>
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${cow.statusColor}`}>
                    {cow.status}
                  </span>
                </td>
                <td className="py-2 sm:py-3 px-1 sm:px-2">
                  <button
                    onClick={() => handleViewDetails(cow)}
                    className="flex items-center space-x-1 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors touch-target"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CowsRequiringAttention; 