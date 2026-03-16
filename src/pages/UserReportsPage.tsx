import { useState } from 'react';
import { User32Icon } from '../components/icons';
import CarbonDropdown from '../components/ui/CarbonDropdown';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserReportsPage = () => {
  const [showCharts, setShowCharts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [yearValue, setYearValue] = useState('2024');
  const [userGroupValue, setUserGroupValue] = useState('');

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: 'all', label: 'All Years' },
  ];

  const userGroupOptions = [
    { value: '', label: 'All Users' },
    { value: 'admin', label: 'Administrators' },
    { value: 'legal', label: 'Legal Team' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'engineering', label: 'Engineering' },
  ];

  // Sample data for weeks since last login
  const weeksSinceLoginData = {
    labels: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8+'],
    datasets: [{
      label: 'Number of Users',
      data: [145, 89, 67, 45, 32, 28, 15, 12, 23],
      backgroundColor: '#2679B2',
      borderRadius: 4,
    }]
  };

  // Sample data for home folder documents (top 10 users)
  const homeFolderData = {
    labels: ['J. Smith', 'A. Johnson', 'M. Williams', 'R. Brown', 'S. Davis', 'K. Miller', 'L. Wilson', 'T. Moore', 'P. Taylor', 'D. Anderson'],
    datasets: [{
      label: 'Documents in Home Folder',
      data: [2847, 2156, 1923, 1654, 1432, 1287, 1156, 987, 876, 765],
      backgroundColor: '#B3DE8E',
      borderRadius: 4,
    }]
  };

  // Sample data for no login (top 10 users with most weeks inactive)
  const noLoginData = {
    labels: ['T. Roberts', 'M. Clark', 'J. Lewis', 'A. Walker', 'S. Hall', 'K. Allen', 'R. Young', 'P. King', 'D. Wright', 'L. Scott'],
    datasets: [{
      label: 'Weeks Since Last Login',
      data: [52, 48, 42, 38, 35, 32, 28, 24, 22, 20],
      backgroundColor: '#FD7F23',
      borderRadius: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { font: { family: 'Noto Sans', size: 12 } }
      }
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#EDF1F5' } },
      x: { grid: { display: false } }
    }
  };

  const horizontalChartOptions = {
    ...chartOptions,
    indexAxis: 'y' as const,
  };

  return (
    <main>
      <div className="p-4 sm:p-6" style={{ backgroundColor: '#ffffff', borderRadius: showCharts ? '16px 16px 0px 0px' : '16px' }}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <User32Icon size={20} aria-hidden="true" />
            User Reports
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">User activity and login statistics</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <CarbonDropdown
              id="yearSelect"
              label="Date Range"
              placeholder="Select year..."
              options={yearOptions}
              value={yearValue}
              onChange={setYearValue}
            />
          </div>
          <div>
            <CarbonDropdown
              id="userGroupSelect"
              label="User/Group Filter"
              placeholder="Select user or group..."
              options={userGroupOptions}
              value={userGroupValue}
              onChange={setUserGroupValue}
            />
          </div>
          <div>
            <label className="block mb-1" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>&nbsp;</label>
            <button
              onClick={() => { setIsLoading(true); setShowCharts(true); setTimeout(() => setIsLoading(false), 1500); }}
              className="text-white"
              style={{ display: 'flex', height: '44px', padding: '10px 14px', alignItems: 'center', background: '#3560C1', border: 'none', cursor: 'pointer' }}
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {showCharts && !isLoading && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px', padding: '24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Weeks Since Last Login</h3>
              <div style={{ height: '300px' }}>
                <Bar data={weeksSinceLoginData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Home Folder Documents (Top 10)</h3>
              <div style={{ height: '300px' }}>
                <Bar data={homeFolderData} options={horizontalChartOptions} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 lg:col-span-2">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Longest Inactive Users (Top 10)</h3>
              <div style={{ height: '300px' }}>
                <Bar data={noLoginData} options={horizontalChartOptions} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showCharts && isLoading && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px', padding: '24px' }}>
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading charts...</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserReportsPage;
