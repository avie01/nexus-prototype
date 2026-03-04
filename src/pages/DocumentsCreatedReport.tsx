import { useState, useEffect } from 'react';
import { Document32Icon, Close32Icon, Information32Icon, TrashCan32Icon, FolderIcon } from '../components/icons';
import CarbonDropdown from '../components/ui/CarbonDropdown';
import ViewToggle from '../components/ui/ViewToggle';
import { Badge } from '../components/ui/Badge';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const DocumentsCreatedReport = () => {
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'charts'>('table');

  const [columnVisibility, setColumnVisibility] = useState({ documentId: true, name: true, createdBy: true, createdDate: true, folderType: true, folderPath: true, docType: true, size: true });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [dateRangeValue, setDateRangeValue] = useState('');
  const [emailFilterValue, setEmailFilterValue] = useState('');
  const [folderTypeValue, setFolderTypeValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const sampleData = [
    { documentId: 'DOC001', name: 'Annual Report 2024.pdf', createdBy: 'John Doe', createdDate: '2024-01-15', folderType: 'Global', folderPath: '/Reports/Annual', docType: 'Document', size: '2.4 MB' },
    { documentId: 'DOC002', name: 'Meeting Notes.docx', createdBy: 'Jane Smith', createdDate: '2024-01-20', folderType: 'Home', folderPath: '/Jane/Notes', docType: 'Document', size: '156 KB' },
    { documentId: 'DOC003', name: 'Project Proposal Email', createdBy: 'Mike Johnson', createdDate: '2024-02-01', folderType: 'Global', folderPath: '/Projects/Alpha', docType: 'Email', size: '1.1 MB' },
    { documentId: 'DOC004', name: 'Contract v2.pdf', createdBy: 'Sarah Wilson', createdDate: '2024-02-10', folderType: 'Global', folderPath: '/Legal/Contracts', docType: 'Document', size: '3.5 MB' },
    { documentId: 'DOC005', name: 'Client Communication', createdBy: 'Alex Brown', createdDate: '2024-02-15', folderType: 'Home', folderPath: '/Alex/Clients', docType: 'Email', size: '892 KB' },
    { documentId: 'DOC006', name: 'Budget Spreadsheet.xlsx', createdBy: 'John Doe', createdDate: '2024-02-20', folderType: 'Global', folderPath: '/Finance/Budgets', docType: 'Document', size: '456 KB' },
    { documentId: 'DOC007', name: 'Training Material.pptx', createdBy: 'Jane Smith', createdDate: '2024-02-25', folderType: 'Global', folderPath: '/HR/Training', docType: 'Document', size: '8.2 MB' },
    { documentId: 'DOC008', name: 'Customer Inquiry Email', createdBy: 'Mike Johnson', createdDate: '2024-03-01', folderType: 'Home', folderPath: '/Mike/Support', docType: 'Email', size: '245 KB' },
    { documentId: 'DOC009', name: 'Security Policy.pdf', createdBy: 'Sarah Wilson', createdDate: '2024-03-02', folderType: 'Global', folderPath: '/IT/Policies', docType: 'Document', size: '1.8 MB' },
    { documentId: 'DOC010', name: 'Vendor Quote Email', createdBy: 'Alex Brown', createdDate: '2024-03-03', folderType: 'Home', folderPath: '/Alex/Procurement', docType: 'Email', size: '567 KB' },
  ];

  const [filteredData, setFilteredData] = useState(sampleData);

  const docsByMonthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'Documents Created', data: [2, 5, 3, 0, 0, 0], borderColor: '#3560C1', backgroundColor: 'rgba(53, 96, 193, 0.1)', fill: true, tension: 0.4 }]
  };

  const docsByTypeData = {
    labels: ['Document', 'Email'],
    datasets: [{ data: [6, 4], backgroundColor: ['#3560C1', '#4F86E7'], borderWidth: 0 }]
  };

  const docsByFolderTypeData = {
    labels: ['Global Folder', 'Home Folder'],
    datasets: [{ data: [6, 4], backgroundColor: ['#3560C1', '#7BA3EF'], borderWidth: 0 }]
  };

  const docsByUserData = {
    labels: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Alex Brown'],
    datasets: [{ label: 'Documents', data: [2, 2, 2, 2, 2], backgroundColor: '#3560C1', borderRadius: 4 }]
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const } }, scales: { y: { beginAtZero: true, grid: { color: '#EDF1F5' } }, x: { grid: { display: false } } } };
  const doughnutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const } } };

  useEffect(() => {
    const handleClickOutside = () => { if (activeActionMenu !== null) setActiveActionMenu(null); };
    if (activeActionMenu !== null) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeActionMenu]);

  useEffect(() => {
    let filtered = [...sampleData];
    if (emailFilterValue === 'excludes-emails') filtered = filtered.filter(item => item.docType !== 'Email');
    if (folderTypeValue === 'global-folder') filtered = filtered.filter(item => item.folderType === 'Global');
    else if (folderTypeValue === 'home-folders') filtered = filtered.filter(item => item.folderType === 'Home');
    setFilteredData(filtered);
  }, [dateRangeValue, emailFilterValue, folderTypeValue]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const SkeletonCell = ({ width = '100%' }: { width?: string }) => (<div className="skeleton-animate h-4 rounded" style={{ width }} />);
  const getFolderBadgeVariant = (folderType: string): 'default' | 'success' | 'info' => folderType === 'Global' ? 'success' : 'info';

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
            <Document32Icon size={20} aria-hidden="true" />
            Documents Created
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Monthly document creation statistics</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <CarbonDropdown id="dateRange" label="Date Range" placeholder="Select date range..." options={[{ value: 'last-month', label: 'Last Month' }, { value: 'last-3-months', label: 'Last 3 Months' }, { value: 'last-6-months', label: 'Last 6 Months' }, { value: 'last-12-months', label: 'Rolling 12 Months' }, { value: 'custom', label: 'Custom Range' }]} value={dateRangeValue} onChange={setDateRangeValue} />
          <CarbonDropdown id="emailFilter" label="Email Inclusion" placeholder="Select filter..." options={[{ value: 'includes-emails', label: 'Includes emails' }, { value: 'excludes-emails', label: 'Excludes emails' }]} value={emailFilterValue} onChange={setEmailFilterValue} />
          <CarbonDropdown id="folderType" label="Folder Location" placeholder="Select folder type..." options={[{ value: 'all-folders', label: 'All Folders', icon: FolderIcon }, { value: 'global-folder', label: 'Global Folder', icon: FolderIcon }, { value: 'home-folders', label: 'Home Folders', icon: FolderIcon }]} value={folderTypeValue} onChange={setFolderTypeValue} />
          <div>
            <label className="block mb-1" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Search</label>
            <div className="flex gap-4">
              <input type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="flex-1 px-3 focus:outline-none hover:bg-[#E8E8E8] transition-all" style={{ border: '1px solid transparent', borderBottom: '1px solid #ACACAC', background: '#F5F5F5', height: '44px', color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px' }} onFocus={(e) => { e.target.style.boxShadow = 'inset 0 0 0 2px #3560C1'; e.target.style.background = '#E8E8E8'; }} onBlur={(e) => { e.target.style.boxShadow = 'none'; e.target.style.background = '#F5F5F5'; }} />
              <button onClick={() => { setIsLoading(true); setShowTable(true); setTimeout(() => setIsLoading(false), 1500); }} className="text-white" style={{ display: 'flex', height: '44px', padding: '10px 14px', alignItems: 'center', background: '#3560C1', border: 'none', cursor: 'pointer' }}>Search</button>
            </div>
          </div>
        </div>
      </div>

      {showTable && (
        <div className="flex items-center justify-between px-6" style={{ backgroundColor: '#f5f5f5', height: '56px' }}>
          <span style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px' }}>Results ({filteredData.length})</span>
          <div className="flex gap-4 items-center">
            <ViewToggle view={viewMode} onViewChange={setViewMode} />
            {viewMode === 'table' && (
              <div className="flex gap-2">
                <button onClick={() => setShowColumnModal(true)} className="hover:bg-gray-50" style={{ display: 'inline-flex', height: '32px', padding: '6px 12px', alignItems: 'center', borderRadius: '2px', border: '1px solid #D1D1D1', background: '#FFF', color: '#525965', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Edit columns</button>
                <button className="hover:bg-gray-50" style={{ display: 'inline-flex', height: '32px', padding: '6px 12px', alignItems: 'center', borderRadius: '2px', border: '1px solid #D1D1D1', background: '#FFF', color: '#525965', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Export results</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showTable && viewMode === 'charts' && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px', padding: '24px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Documents Created (Monthly)</h3>
              <div style={{ height: '280px' }}><Line data={docsByMonthData} options={chartOptions} /></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Documents by Type</h3>
              <div style={{ height: '280px' }}><Doughnut data={docsByTypeData} options={doughnutOptions} /></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Global vs Home Folders</h3>
              <div style={{ height: '280px' }}><Doughnut data={docsByFolderTypeData} options={doughnutOptions} /></div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Documents by Creator</h3>
              <div style={{ height: '280px' }}><Bar data={docsByUserData} options={chartOptions} /></div>
            </div>
          </div>
        </div>
      )}

      {showTable && viewMode === 'table' && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[768px]" role="table">
              <thead>
                <tr className="border-b border-gray-200">
                  {columnVisibility.documentId && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Document ID</th>}
                  {columnVisibility.name && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Name</th>}
                  {columnVisibility.createdBy && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Created By</th>}
                  {columnVisibility.createdDate && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Created Date</th>}
                  {columnVisibility.folderType && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Folder Type</th>}
                  {columnVisibility.folderPath && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Folder Path</th>}
                  {columnVisibility.docType && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Type</th>}
                  {columnVisibility.size && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Size</th>}
                  <th className="text-left py-3 px-4" style={{ color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b border-gray-100">
                    {columnVisibility.documentId && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="60px" /></td>}
                    {columnVisibility.name && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="150px" /></td>}
                    {columnVisibility.createdBy && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="100px" /></td>}
                    {columnVisibility.createdDate && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="80px" /></td>}
                    {columnVisibility.folderType && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="70px" /></td>}
                    {columnVisibility.folderPath && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="120px" /></td>}
                    {columnVisibility.docType && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="70px" /></td>}
                    {columnVisibility.size && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="60px" /></td>}
                    <td className="py-3 px-4"><SkeletonCell width="24px" /></td>
                  </tr>
                )) : currentData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-[#E8E8E8] transition-colors">
                    {columnVisibility.documentId && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.documentId}</td>}
                    {columnVisibility.name && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.name}</td>}
                    {columnVisibility.createdBy && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.createdBy}</td>}
                    {columnVisibility.createdDate && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.createdDate}</td>}
                    {columnVisibility.folderType && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}><Badge variant={getFolderBadgeVariant(row.folderType)}>{row.folderType}</Badge></td>}
                    {columnVisibility.folderPath && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.folderPath}</td>}
                    {columnVisibility.docType && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.docType}</td>}
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
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t gap-4" style={{ borderColor: '#EDF1F5' }}>
            <div className="text-sm text-gray-700">Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results</div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 text-sm border rounded" style={{ borderColor: '#d1d1d1', backgroundColor: currentPage === 1 ? '#f5f5f5' : '#ffffff', color: currentPage === 1 ? '#9ca3af' : '#374151', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (<button key={page} onClick={() => setCurrentPage(page)} className="px-3 py-1 text-sm border rounded" style={{ borderColor: '#d1d1d1', backgroundColor: currentPage === page ? '#3560C1' : '#ffffff', color: currentPage === page ? '#ffffff' : '#374151' }}>{page}</button>))}
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
                const labels: Record<string, string> = { documentId: 'Document ID', name: 'Name', createdBy: 'Created By', createdDate: 'Created Date', folderType: 'Folder Type', folderPath: 'Folder Path', docType: 'Type', size: 'Size' };
                return (<label key={key} className="flex items-center space-x-3 cursor-pointer"><input type="checkbox" checked={visible} onChange={(e) => setColumnVisibility(prev => ({ ...prev, [key]: e.target.checked }))} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" /><span className="text-sm text-gray-700">{labels[key]}</span></label>);
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

export default DocumentsCreatedReport;
