import { useState } from 'react';
import { Document32Icon } from '../components/icons';
import CarbonDropdown from '../components/ui/CarbonDropdown';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DocumentReportsPage = () => {
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
    { value: 'legal', label: 'Legal Documents' },
    { value: 'finance', label: 'Finance Documents' },
    { value: 'hr', label: 'HR Documents' },
    { value: 'contracts', label: 'Contracts' },
  ];

  // Sample data for document extensions (pie chart)
  const documentExtensionsData = {
    labels: ['.pdf', '.docx', '.xlsx', '.msg', '.pptx', '.txt', '.jpg', '.png', '.html', 'Other'],
    datasets: [{
      data: [35, 22, 15, 12, 5, 3, 3, 2, 1, 2],
      backgroundColor: ['#2679B2', '#B3DE8E', '#FD7F23', '#6A4198', '#E11F27', '#707070', '#00A3A1', '#FFB800', '#005A9E', '#CCCCCC'],
      borderWidth: 0,
    }]
  };

  // Sample data for document object types (pie chart)
  const documentObjectTypesData = {
    labels: ['Document', 'eMail', 'Correspondence', 'Contract', 'Invoice', 'Report', 'Memo', 'Other'],
    datasets: [{
      data: [28, 25, 15, 12, 8, 5, 4, 3],
      backgroundColor: ['#2679B2', '#B3DE8E', '#FD7F23', '#6A4198', '#E11F27', '#707070', '#00A3A1', '#CCCCCC'],
      borderWidth: 0,
    }]
  };

  // Sample data for versions created by month
  const versionsCreatedData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Versions Created',
      data: [0, 0, 15274, 14496, 15233, 12633, 22501, 13920, 14065, 17992, 15964, 11020],
      backgroundColor: '#2679B2',
      borderRadius: 4,
    }]
  };

  // Sample data for corporate value (with and without)
  const corporateValueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'With Corporate Value',
        data: [8500, 9200, 8700, 9100, 9800, 8200, 11200, 8500, 8900, 10500, 9200, 6800],
        backgroundColor: '#B3DE8E',
        borderRadius: 4,
      },
      {
        label: 'Without Corporate Value',
        data: [0, 0, 6574, 5396, 5433, 4433, 11301, 5420, 5165, 7492, 6764, 4220],
        backgroundColor: '#FD7F23',
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

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { font: { family: 'Noto Sans', size: 11 } }
      }
    }
  };

  return (
    <main>
      <div className="p-4 sm:p-6" style={{ backgroundColor: '#ffffff', borderRadius: showCharts ? '16px 16px 0px 0px' : '16px' }}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <Document32Icon size={20} aria-hidden="true" />
            Document Reports
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Document types, versions, and corporate value analysis</p>
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
              <h3 className="text-base font-semibold text-gray-800 mb-4">Document Extensions (Top 10)</h3>
              <div style={{ height: '300px' }}>
                <Pie data={documentExtensionsData} options={pieOptions} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Document Object Types</h3>
              <div style={{ height: '300px' }}>
                <Pie data={documentObjectTypesData} options={pieOptions} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Versions Created (Monthly)</h3>
              <div style={{ height: '300px' }}>
                <Bar data={versionsCreatedData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Corporate Value (Monthly)</h3>
              <div style={{ height: '300px' }}>
                <Bar data={corporateValueData} options={chartOptions} />
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

export default DocumentReportsPage;
