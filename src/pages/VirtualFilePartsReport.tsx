import { useState, useEffect } from 'react';
import { Folders32Icon, Close32Icon, Information32Icon, TrashCan32Icon } from '../components/icons';
import CarbonDropdown from '../components/ui/CarbonDropdown';
import { Badge } from '../components/ui/Badge';
import ViewToggle from '../components/ui/ViewToggle';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const VirtualFilePartsReport = () => {
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [view, setView] = useState<'table' | 'charts'>('table');

  const [columnVisibility, setColumnVisibility] = useState({
    partId: true,
    fileName: true,
    status: true,
    createdBy: true,
    createdDate: true,
    closedDate: true,
    size: true
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [dateRangeValue, setDateRangeValue] = useState('');
  const [statusFilterValue, setStatusFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const sampleData = [
    { partId: 'VFP001', fileName: 'Report_Part1.dat', status: 'Created', createdBy: 'John Doe', createdDate: '2024-01-15', closedDate: '-', size: '45 MB' },
    { partId: 'VFP002', fileName: 'Archive_Segment.dat', status: 'Closed', createdBy: 'Jane Smith', createdDate: '2024-01-10', closedDate: '2024-01-20', size: '128 MB' },
    { partId: 'VFP003', fileName: 'Backup_Part3.dat', status: 'Created', createdBy: 'Mike Johnson', createdDate: '2024-02-01', closedDate: '-', size: '256 MB' },
    { partId: 'VFP004', fileName: 'Data_Chunk_A.dat', status: 'Closed', createdBy: 'Sarah Wilson', createdDate: '2024-01-25', closedDate: '2024-02-10', size: '89 MB' },
    { partId: 'VFP005', fileName: 'Index_Part2.dat', status: 'Created', createdBy: 'Alex Brown', createdDate: '2024-02-15', closedDate: '-', size: '34 MB' },
    { partId: 'VFP006', fileName: 'Media_Segment.dat', status: 'Closed', createdBy: 'John Doe', createdDate: '2024-02-05', closedDate: '2024-02-20', size: '512 MB' },
    { partId: 'VFP007', fileName: 'Log_Part4.dat', status: 'Created', createdBy: 'Jane Smith', createdDate: '2024-02-25', closedDate: '-', size: '12 MB' },
    { partId: 'VFP008', fileName: 'Cache_Chunk.dat', status: 'Closed', createdBy: 'Mike Johnson', createdDate: '2024-02-18', closedDate: '2024-03-01', size: '67 MB' },
  ];

  const [filteredData, setFilteredData] = useState(sampleData);

  useEffect(() => {
    const handleClickOutside = () => {
      if (activeActionMenu !== null) setActiveActionMenu(null);
    };
    if (activeActionMenu !== null) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeActionMenu]);

  useEffect(() => {
    let filtered = [...sampleData];

    if (statusFilterValue === 'created') {
      filtered = filtered.filter(item => item.status === 'Created');
    } else if (statusFilterValue === 'closed') {
      filtered = filtered.filter(item => item.status === 'Closed');
    }

    setFilteredData(filtered);
  }, [dateRangeValue, statusFilterValue]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const SkeletonCell = ({ width = '100%' }: { width?: string }) => (
    <div className="skeleton-animate h-4 rounded" style={{ width }} />
  );

  const getStatusBadgeVariant = (status: string): 'default' | 'success' | 'info' => {
    return status === 'Created' ? 'success' : 'info';
  };

  // Chart data
  const partsByUserData = {
    labels: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown'],
    datasets: [{
      label: 'File Parts',
      data: [2, 2, 2, 1, 1],
      backgroundColor: ['#3560C1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      borderRadius: 4,
    }]
  };

  const monthlyTrendData = {
    labels: ['Jan 2024', 'Feb 2024', 'Mar 2024'],
    datasets: [{
      label: 'Parts Created',
      data: [3, 4, 1],
      borderColor: '#3560C1',
      backgroundColor: 'rgba(53, 96, 193, 0.1)',
      fill: true,
      tension: 0.4,
    }]
  };

  const statusDistributionData = {
    labels: ['Created', 'Closed'],
    datasets: [{
      data: [4, 4],
      backgroundColor: ['#10B981', '#3560C1'],
      borderWidth: 0,
    }]
  };

  const sizeDistributionData = {
    labels: ['0-50 MB', '50-100 MB', '100-200 MB', '200+ MB'],
    datasets: [{
      label: 'Parts by Size',
      data: [2, 2, 1, 3],
      backgroundColor: ['#3560C1', '#10B981', '#F59E0B', '#8B5CF6'],
      borderRadius: 4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: '#E5E7EB' } },
      x: { grid: { display: false } }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
    },
  };

  return (
    <main>
      <style>{`
        input::placeholder { color: #707070 !important; font-family: "Noto Sans" !important; font-size: 14px !important; font-style: italic !important; }
        @keyframes skeleton-loading { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .skeleton-animate { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s infinite; }
      `}</style>
      <div className="p-4 sm:p-6" style={{ backgroundColor: '#ffffff', borderRadius: showTable ? '16px 16px 0px 0px' : '16px' }}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <Folders32Icon size={20} aria-hidden="true" />
            Virtual File Parts
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Created and Closed virtual file parts</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <CarbonDropdown
              id="dateRange"
              label="Date Range"
              placeholder="Select date range..."
              options={[
                { value: 'last-month', label: 'Last Month' },
                { value: 'last-3-months', label: 'Last 3 Months' },
                { value: 'last-6-months', label: 'Last 6 Months' },
                { value: 'last-12-months', label: 'Rolling 12 Months' },
                { value: 'custom', label: 'Custom Range' }
              ]}
              value={dateRangeValue}
              onChange={setDateRangeValue}
            />
          </div>
          <div>
            <CarbonDropdown
              id="statusFilter"
              label="Status"
              placeholder="Select status..."
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'created', label: 'Created' },
                { value: 'closed', label: 'Closed' }
              ]}
              value={statusFilterValue}
              onChange={setStatusFilterValue}
            />
          </div>
          <div>
            <label className="block mb-1" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Search</label>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="flex-1 px-3 focus:outline-none hover:bg-[#E8E8E8] transition-all"
                style={{ border: '1px solid transparent', borderBottom: '1px solid #ACACAC', background: '#F5F5F5', height: '44px', color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px' }}
                onFocus={(e) => { e.target.style.boxShadow = 'inset 0 0 0 2px #3560C1'; e.target.style.background = '#E8E8E8'; }}
                onBlur={(e) => { e.target.style.boxShadow = 'none'; e.target.style.background = '#F5F5F5'; }}
              />
              <button
                onClick={() => { setIsLoading(true); setShowTable(true); setTimeout(() => setIsLoading(false), 1500); }}
                className="text-white"
                style={{ display: 'flex', height: '44px', padding: '10px 14px', alignItems: 'center', background: '#3560C1', border: 'none', cursor: 'pointer' }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {showTable && (
        <div className="flex items-center justify-between px-6" style={{ backgroundColor: '#f5f5f5', height: '56px' }}>
          <span style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px' }}>Results ({filteredData.length})</span>
          <div className="flex gap-2 items-center">
            <ViewToggle view={view} onViewChange={setView} />
            <button onClick={() => setShowColumnModal(true)} className="hover:bg-gray-50" style={{ display: 'inline-flex', height: '32px', padding: '6px 12px', alignItems: 'center', borderRadius: '2px', border: '1px solid #D1D1D1', background: '#FFF', color: '#525965', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Edit columns</button>
            <button className="hover:bg-gray-50" style={{ display: 'inline-flex', height: '32px', padding: '6px 12px', alignItems: 'center', borderRadius: '2px', border: '1px solid #D1D1D1', background: '#FFF', color: '#525965', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Export results</button>
          </div>
        </div>
      )}
      {showTable && view === 'charts' && (
        <div className="p-6 bg-white" style={{ borderRadius: '0px 0px 16px 16px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Parts by User</h3>
              <div style={{ height: '250px' }}>
                <Bar data={partsByUserData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Trend</h3>
              <div style={{ height: '250px' }}>
                <Line data={monthlyTrendData} options={chartOptions} />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Status Distribution</h3>
              <div style={{ height: '250px' }}>
                <Doughnut data={statusDistributionData} options={doughnutOptions} />
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Size Distribution</h3>
              <div style={{ height: '250px' }}>
                <Bar data={sizeDistributionData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      )}
      {showTable && view === 'table' && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[768px]" role="table">
              <thead>
                <tr className="border-b border-gray-200">
                  {columnVisibility.partId && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Part ID</th>}
                  {columnVisibility.fileName && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>File Name</th>}
                  {columnVisibility.status && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Status</th>}
                  {columnVisibility.createdBy && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Created By</th>}
                  {columnVisibility.createdDate && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Created Date</th>}
                  {columnVisibility.closedDate && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Closed Date</th>}
                  {columnVisibility.size && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Size</th>}
                  <th className="text-left py-3 px-4" style={{ color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="border-b border-gray-100">
                      {columnVisibility.partId && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="60px" /></td>}
                      {columnVisibility.fileName && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="150px" /></td>}
                      {columnVisibility.status && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="70px" /></td>}
                      {columnVisibility.createdBy && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="100px" /></td>}
                      {columnVisibility.createdDate && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="80px" /></td>}
                      {columnVisibility.closedDate && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="80px" /></td>}
                      {columnVisibility.size && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="60px" /></td>}
                      <td className="py-3 px-4"><SkeletonCell width="24px" /></td>
                    </tr>
                  ))
                ) : (
                  currentData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-[#E8E8E8] transition-colors">
                      {columnVisibility.partId && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.partId}</td>}
                      {columnVisibility.fileName && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.fileName}</td>}
                      {columnVisibility.status && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}><Badge variant={getStatusBadgeVariant(row.status)}>{row.status}</Badge></td>}
                      {columnVisibility.createdBy && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.createdBy}</td>}
                      {columnVisibility.createdDate && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.createdDate}</td>}
                      {columnVisibility.closedDate && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.closedDate}</td>}
                      {columnVisibility.size && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.size}</td>}
                      <td className="py-3 px-4 relative">
                        <button onClick={() => setActiveActionMenu(activeActionMenu === index ? null : index)} className="flex items-center justify-center w-6 h-6 hover:bg-gray-100 rounded" style={{ color: '#707070' }}>
                          <div style={{ width: '16px', height: '16px', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%23707070\'%3e%3ccircle cx=\'8\' cy=\'3\' r=\'1.5\'/%3e%3ccircle cx=\'8\' cy=\'8\' r=\'1.5\'/%3e%3ccircle cx=\'8\' cy=\'13\' r=\'1.5\'/%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '16px' }} />
                        </button>
                        {activeActionMenu === index && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                            <div className="py-2">
                              <button onClick={() => setActiveActionMenu(null)} className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"><Information32Icon size={16} className="mr-3" style={{ color: '#32373F' }} />Details</button>
                              <button onClick={() => setActiveActionMenu(null)} className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"><TrashCan32Icon size={16} className="mr-3" style={{ color: '#32373F' }} />Delete</button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t gap-4" style={{ borderColor: '#EDF1F5' }}>
            <div className="text-sm text-gray-700">Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results</div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-sm border rounded" style={{ borderColor: '#d1d1d1', backgroundColor: currentPage === 1 ? '#f5f5f5' : '#ffffff', color: currentPage === 1 ? '#9ca3af' : '#374151', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className="px-3 py-1 text-sm border rounded" style={{ borderColor: '#d1d1d1', backgroundColor: currentPage === page ? '#3560C1' : '#ffffff', color: currentPage === page ? '#ffffff' : '#374151' }}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 text-sm border rounded" style={{ borderColor: '#d1d1d1', backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#ffffff', color: currentPage === totalPages ? '#9ca3af' : '#374151', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
            </div>
          </div>
        </div>
      )}
      {showColumnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Columns</h3>
              <button onClick={() => setShowColumnModal(false)} className="text-gray-400 hover:text-gray-600"><Close32Icon size={20} /></button>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {Object.entries(columnVisibility).map(([key, visible]) => {
                const labels: Record<string, string> = { partId: 'Part ID', fileName: 'File Name', status: 'Status', createdBy: 'Created By', createdDate: 'Created Date', closedDate: 'Closed Date', size: 'Size' };
                return (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" checked={visible} onChange={(e) => setColumnVisibility(prev => ({ ...prev, [key]: e.target.checked }))} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                    <span className="text-sm text-gray-700">{labels[key]}</span>
                  </label>
                );
              })}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={() => setShowColumnModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={() => setShowColumnModal(false)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Apply</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default VirtualFilePartsReport;
