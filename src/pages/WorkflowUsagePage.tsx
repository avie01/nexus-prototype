import { useState } from 'react';
import { ClipboardListIcon } from '../components/icons';
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

const WorkflowUsagePage = () => {
  const [showCharts, setShowCharts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [yearValue, setYearValue] = useState('2024');

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: 'all', label: 'All Years' },
  ];

  // Sample data for monthly processes (slips created vs completed)
  const monthlyProcessesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Slips Created',
        data: [145, 178, 156, 189, 167, 134, 156, 178, 145, 167, 189, 156],
        backgroundColor: '#2679B2',
        borderRadius: 4,
      },
      {
        label: 'Slips Completed',
        data: [132, 165, 148, 175, 155, 128, 145, 162, 138, 155, 172, 148],
        backgroundColor: '#B3DE8E',
        borderRadius: 4,
      }
    ]
  };

  // Sample data for open processes by workflow
  const openProcessesData = {
    labels: ['Document Approval', 'Travel Request', 'Leave Request', 'Purchase Order', 'Contract Review', 'Other'],
    datasets: [{
      data: [45, 28, 32, 18, 22, 15],
      backgroundColor: ['#2679B2', '#B3DE8E', '#FD7F23', '#6A4198', '#E11F27', '#707070'],
      borderWidth: 0,
    }]
  };

  // Sample data for days since start (grouped by workflow and days)
  const daysSinceStartData = {
    labels: ['1-7 days', '8-14 days', '15-21 days', '22-30 days', '30+ days'],
    datasets: [
      {
        label: 'Document Approval',
        data: [12, 8, 5, 3, 2],
        backgroundColor: '#2679B2',
        borderRadius: 4,
      },
      {
        label: 'Travel Request',
        data: [8, 6, 4, 2, 1],
        backgroundColor: '#B3DE8E',
        borderRadius: 4,
      },
      {
        label: 'Leave Request',
        data: [10, 7, 3, 2, 1],
        backgroundColor: '#FD7F23',
        borderRadius: 4,
      },
      {
        label: 'Purchase Order',
        data: [5, 4, 3, 2, 1],
        backgroundColor: '#6A4198',
        borderRadius: 4,
      },
      {
        label: 'Contract Review',
        data: [6, 5, 4, 3, 2],
        backgroundColor: '#E11F27',
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
      y: {
        beginAtZero: true,
        grid: { color: '#EDF1F5' },
        stacked: false,
      },
      x: {
        grid: { display: false },
        stacked: false,
      }
    }
  };

  const stackedChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#EDF1F5' },
        stacked: true,
      },
      x: {
        grid: { display: false },
        stacked: true,
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: { font: { family: 'Noto Sans', size: 12 } }
      }
    }
  };

  return (
    <main>
      <div className="p-4 sm:p-6" style={{ backgroundColor: '#ffffff', borderRadius: showCharts ? '16px 16px 0px 0px' : '16px' }}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <ClipboardListIcon size={20} aria-hidden="true" />
            Workflow Usage
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Workflow process statistics and analysis</p>
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
              <h3 className="text-base font-semibold text-gray-800 mb-4">Monthly Processes</h3>
              <div style={{ height: '300px' }}>
                <Bar data={monthlyProcessesData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Open Processes by Workflow</h3>
              <div style={{ height: '300px' }}>
                <Pie data={openProcessesData} options={pieOptions} />
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 lg:col-span-2">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Days Since Start (Open Slips by Workflow)</h3>
              <div style={{ height: '300px' }}>
                <Bar data={daysSinceStartData} options={stackedChartOptions} />
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

export default WorkflowUsagePage;
