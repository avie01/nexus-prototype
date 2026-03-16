import { useState } from 'react';
import { Folders32Icon } from '../components/icons';
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

const FileReportsPage = () => {
  const [showCharts, setShowCharts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [yearValue, setYearValue] = useState('2024');
  const [ancestorValue, setAncestorValue] = useState('');

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: 'all', label: 'All Years' },
  ];

  const ancestorOptions = [
    { value: '', label: 'All Locations' },
    { value: 'global', label: 'Global Folder' },
    { value: 'legal', label: 'Legal Files' },
    { value: 'finance', label: 'Finance Files' },
    { value: 'hr', label: 'HR Files' },
    { value: 'projects', label: 'Project Files' },
  ];

  // Sample data for file parts created by month
  const filePartsCreatedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Virtual File Parts',
        data: [266, 233, 326, 267, 393, 393, 312, 273, 268, 216, 251, 217],
        backgroundColor: '#2679B2',
        borderRadius: 4,
      },
      {
        label: 'Physical File Parts',
        data: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
        backgroundColor: '#B3DE8E',
        borderRadius: 4,
      }
    ]
  };

  // Sample data for file parts closed by month
  const filePartsClosedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Virtual File Parts',
        data: [773, 135, 32, 70, 255, 752, 307, 161, 366, 160, 304, 334],
        backgroundColor: '#FD7F23',
        borderRadius: 4,
      },
      {
        label: 'Physical File Parts',
        data: [3, 23, 1, 9, 9, 4, 4, 3, 0, 3, 9, 0],
        backgroundColor: '#6A4198',
        borderRadius: 4,
      }
    ]
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

  return (
    <main>
      <div className="p-4 sm:p-6" style={{ backgroundColor: '#ffffff', borderRadius: showCharts ? '16px 16px 0px 0px' : '16px' }}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <Folders32Icon size={20} aria-hidden="true" />
            File Reports
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">File part creation and closure statistics</p>
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
              id="ancestorSelect"
              label="Ancestor Filter"
              placeholder="Select location..."
              options={ancestorOptions}
              value={ancestorValue}
              onChange={setAncestorValue}
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
              <h3 className="text-base font-semibold text-gray-800 mb-4">File Parts Created (Monthly)</h3>
              <div style={{ height: '300px' }}>
                <Bar data={filePartsCreatedData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">File Parts Closed (Monthly)</h3>
              <div style={{ height: '300px' }}>
                <Bar data={filePartsClosedData} options={chartOptions} />
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

export default FileReportsPage;
