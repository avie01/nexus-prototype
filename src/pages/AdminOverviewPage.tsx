import { useState } from 'react';
import { ReportData32Icon, CheckboxCheckedFilled32Icon, Checkbox32Icon, XIcon } from '../components/icons';
import CarbonDropdown from '../components/ui/CarbonDropdown';

// Pencil icon for modal header
const PencilIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10 3.6 3.6-10 10H6z" />
  </svg>
);

// Search icon
const SearchIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" className={className}>
    <path d="M29 27.586l-7.552-7.552a11.018 11.018 0 10-1.414 1.414L27.586 29zM4 13a9 9 0 119 9 9.01 9.01 0 01-9-9z" />
  </svg>
);

// Drag handle icon
const DragHandleIcon = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className={className}>
    <circle cx="5" cy="3" r="1.5" />
    <circle cx="11" cy="3" r="1.5" />
    <circle cx="5" cy="8" r="1.5" />
    <circle cx="11" cy="8" r="1.5" />
    <circle cx="5" cy="13" r="1.5" />
    <circle cx="11" cy="13" r="1.5" />
  </svg>
);

const AdminOverviewPage = () => {
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [yearValue, setYearValue] = useState('2024');
  const [ancestorValue, setAncestorValue] = useState('');
  const [objectTypeValue, setObjectTypeValue] = useState('');
  const [extensionValue, setExtensionValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selectable columns
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'documentsCreated',
    'versionsCreated',
    'filesCreated',
    'virtualFilePartsCreated',
    'physicalFilePartsCreated',
    'virtualFilePartsClosed',
    'physicalFilePartsClosed'
  ]);

  // Temporary selection for modal (to allow cancel)
  const [tempSelectedColumns, setTempSelectedColumns] = useState<string[]>([]);
  const [filterText, setFilterText] = useState('');

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: 'all', label: 'All Years' },
  ];

  const ancestorOptions = [
    { value: '', label: 'All Locations' },
    { value: 'global', label: 'Global Folder' },
    { value: 'legal', label: 'Legal' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'HR' },
  ];

  const objectTypeOptions = [
    { value: '', label: 'All Object Types' },
    { value: 'document', label: 'Document' },
    { value: 'email', label: 'eMail' },
    { value: 'correspondence', label: 'Correspondence' },
    { value: 'contract', label: 'Contract' },
  ];

  const extensionOptions = [
    { value: '', label: 'All Extensions' },
    { value: 'pdf', label: '.pdf' },
    { value: 'docx', label: '.docx' },
    { value: 'xlsx', label: '.xlsx' },
    { value: 'msg', label: '.msg' },
  ];

  // Grouped column options for modal
  const columnGroups = [
    {
      label: 'Document fields',
      options: [
        { key: 'documentsCreated', label: 'Documents Created' },
        { key: 'versionsCreated', label: 'Versions Created' },
      ]
    },
    {
      label: 'File fields',
      options: [
        { key: 'filesCreated', label: 'Files Created' },
        { key: 'virtualFilePartsCreated', label: 'Virtual File Parts Created' },
        { key: 'physicalFilePartsCreated', label: 'Physical File Parts Created' },
        { key: 'virtualFilePartsClosed', label: 'Virtual File Parts Closed' },
        { key: 'physicalFilePartsClosed', label: 'Physical File Parts Closed' },
      ]
    }
  ];

  // Flat list for table rendering
  const columnOptions = columnGroups.flatMap(g => g.options);

  // Locked field (always shown, cannot be removed)
  const lockedField = { key: 'month', label: 'Month' };

  const openModal = () => {
    setTempSelectedColumns([...selectedColumns]);
    setFilterText('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleTempColumn = (key: string) => {
    if (tempSelectedColumns.includes(key)) {
      setTempSelectedColumns(tempSelectedColumns.filter(c => c !== key));
    } else {
      setTempSelectedColumns([...tempSelectedColumns, key]);
    }
  };

  const applyColumns = () => {
    setSelectedColumns([...tempSelectedColumns]);
    setIsModalOpen(false);
  };

  // Filter available columns based on search
  const filteredGroups = columnGroups.map(group => ({
    ...group,
    options: group.options.filter(opt =>
      opt.label.toLowerCase().includes(filterText.toLowerCase())
    )
  })).filter(group => group.options.length > 0);

  // Get selected column objects in order
  const selectedColumnObjects = tempSelectedColumns
    .map(key => columnOptions.find(opt => opt.key === key))
    .filter(Boolean) as { key: string; label: string }[];

  // Sample monthly data
  const monthlyData = [
    { month: 'Jan-24', documentsCreated: 21447, versionsCreated: 0, filesCreated: 45, virtualFilePartsCreated: 266, physicalFilePartsCreated: 0, virtualFilePartsClosed: 773, physicalFilePartsClosed: 3 },
    { month: 'Feb-24', documentsCreated: 25593, versionsCreated: 0, filesCreated: 52, virtualFilePartsCreated: 233, physicalFilePartsCreated: 0, virtualFilePartsClosed: 135, physicalFilePartsClosed: 23 },
    { month: 'Mar-24', documentsCreated: 21917, versionsCreated: 15274, filesCreated: 48, virtualFilePartsCreated: 326, physicalFilePartsCreated: 0, virtualFilePartsClosed: 32, physicalFilePartsClosed: 1 },
    { month: 'Apr-24', documentsCreated: 23364, versionsCreated: 14496, filesCreated: 56, virtualFilePartsCreated: 267, physicalFilePartsCreated: 0, virtualFilePartsClosed: 70, physicalFilePartsClosed: 9 },
    { month: 'May-24', documentsCreated: 24647, versionsCreated: 15233, filesCreated: 61, virtualFilePartsCreated: 393, physicalFilePartsCreated: 1, virtualFilePartsClosed: 255, physicalFilePartsClosed: 9 },
    { month: 'Jun-24', documentsCreated: 19929, versionsCreated: 12633, filesCreated: 42, virtualFilePartsCreated: 393, physicalFilePartsCreated: 0, virtualFilePartsClosed: 752, physicalFilePartsClosed: 4 },
    { month: 'Jul-24', documentsCreated: 22602, versionsCreated: 22501, filesCreated: 58, virtualFilePartsCreated: 312, physicalFilePartsCreated: 1, virtualFilePartsClosed: 307, physicalFilePartsClosed: 4 },
    { month: 'Aug-24', documentsCreated: 21097, versionsCreated: 13920, filesCreated: 47, virtualFilePartsCreated: 273, physicalFilePartsCreated: 0, virtualFilePartsClosed: 161, physicalFilePartsClosed: 3 },
    { month: 'Sep-24', documentsCreated: 17938, versionsCreated: 14065, filesCreated: 39, virtualFilePartsCreated: 268, physicalFilePartsCreated: 0, virtualFilePartsClosed: 366, physicalFilePartsClosed: 0 },
    { month: 'Oct-24', documentsCreated: 21510, versionsCreated: 17992, filesCreated: 54, virtualFilePartsCreated: 216, physicalFilePartsCreated: 0, virtualFilePartsClosed: 160, physicalFilePartsClosed: 3 },
    { month: 'Nov-24', documentsCreated: 22448, versionsCreated: 15964, filesCreated: 51, virtualFilePartsCreated: 251, physicalFilePartsCreated: 0, virtualFilePartsClosed: 304, physicalFilePartsClosed: 9 },
    { month: 'Dec-24', documentsCreated: 27242, versionsCreated: 11020, filesCreated: 63, virtualFilePartsCreated: 217, physicalFilePartsCreated: 0, virtualFilePartsClosed: 334, physicalFilePartsClosed: 0 },
  ];

  // Calculate totals
  const totals = monthlyData.reduce((acc, row) => ({
    documentsCreated: acc.documentsCreated + row.documentsCreated,
    versionsCreated: acc.versionsCreated + row.versionsCreated,
    filesCreated: acc.filesCreated + row.filesCreated,
    virtualFilePartsCreated: acc.virtualFilePartsCreated + row.virtualFilePartsCreated,
    physicalFilePartsCreated: acc.physicalFilePartsCreated + row.physicalFilePartsCreated,
    virtualFilePartsClosed: acc.virtualFilePartsClosed + row.virtualFilePartsClosed,
    physicalFilePartsClosed: acc.physicalFilePartsClosed + row.physicalFilePartsClosed,
  }), {
    documentsCreated: 0, versionsCreated: 0, filesCreated: 0,
    virtualFilePartsCreated: 0, physicalFilePartsCreated: 0,
    virtualFilePartsClosed: 0, physicalFilePartsClosed: 0
  });

  const formatNumber = (num: number) => num.toLocaleString();

  const visibleColumns = columnOptions.filter(col => selectedColumns.includes(col.key));

  const SkeletonCell = ({ width = '100%' }: { width?: string }) => (
    <div className="skeleton-animate h-4 rounded" style={{ width }} />
  );

  return (
    <main>
      <style>{`
        @keyframes skeleton-loading { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .skeleton-animate { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s infinite; }
      `}</style>
      <div className="p-4 sm:p-6" style={{ backgroundColor: '#ffffff', borderRadius: showTable ? '16px 16px 0px 0px' : '16px' }}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <ReportData32Icon size={20} aria-hidden="true" />
            Admin Overview
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Customizable administrative statistics table</p>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
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
              label="Ancestor"
              placeholder="Select location..."
              options={ancestorOptions}
              value={ancestorValue}
              onChange={setAncestorValue}
            />
          </div>
          <div>
            <CarbonDropdown
              id="objectTypeSelect"
              label="Object Type"
              placeholder="Select type..."
              options={objectTypeOptions}
              value={objectTypeValue}
              onChange={setObjectTypeValue}
            />
          </div>
          <div>
            <CarbonDropdown
              id="extensionSelect"
              label="Extension"
              placeholder="Select extension..."
              options={extensionOptions}
              value={extensionValue}
              onChange={setExtensionValue}
            />
          </div>
          <div>
            <label className="block mb-1" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600' }}>&nbsp;</label>
            <button
              onClick={() => { setIsLoading(true); setShowTable(true); setTimeout(() => setIsLoading(false), 1500); }}
              className="text-white"
              style={{ display: 'flex', height: '44px', padding: '10px 14px', alignItems: 'center', background: '#3560C1', border: 'none', cursor: 'pointer' }}
            >
              Generate Report
            </button>
          </div>
        </div>

      </div>

      {showTable && (
        <div className="flex items-center justify-between px-4" style={{ backgroundColor: '#f5f5f5', height: '56px' }}>
          <span style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px' }}>Results ({monthlyData.length} months)</span>
          <div className="flex gap-3 items-center">
            <button onClick={openModal} className="hover:bg-gray-50" style={{ display: 'inline-flex', height: '32px', padding: '6px 12px', alignItems: 'center', borderRadius: '2px', border: '1px solid #D1D1D1', background: '#FFF', color: '#525965', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Edit columns</button>
            <button className="hover:bg-gray-50" style={{ display: 'inline-flex', height: '32px', padding: '6px 12px', alignItems: 'center', borderRadius: '2px', border: '1px solid #D1D1D1', background: '#FFF', color: '#525965', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Export results</button>
          </div>
        </div>
      )}

      {showTable && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px' }}>
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-gray-200" style={{ borderTop: '1px solid #d1d1d1' }}>
                  <th
                    className="py-3 px-4 text-left"
                    style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}
                  >
                    Month
                  </th>
                  {visibleColumns.map((col, idx) => (
                    <th
                      key={col.key}
                      className="py-3 px-4 text-right"
                      style={{ borderRight: idx < visibleColumns.length - 1 ? '1px solid #EDF1F5' : undefined, color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="border-b border-gray-100">
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}>
                        <SkeletonCell width="60px" />
                      </td>
                      {visibleColumns.map((col, idx) => (
                        <td key={col.key} className="py-3 px-4" style={{ borderRight: idx < visibleColumns.length - 1 ? '1px solid #EDF1F5' : undefined }}>
                          <SkeletonCell width="80px" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <>
                    {monthlyData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-[#E8E8E8] transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.month}</td>
                        {visibleColumns.map((col, idx) => (
                          <td key={col.key} className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: idx < visibleColumns.length - 1 ? '1px solid #EDF1F5' : undefined }}>
                            {formatNumber(row[col.key as keyof typeof row] as number)}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* Totals Row */}
                    <tr className="bg-gray-100 font-bold">
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>TOTAL</td>
                      {visibleColumns.map((col, idx) => (
                        <td key={col.key} className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: idx < visibleColumns.length - 1 ? '1px solid #EDF1F5' : undefined }}>
                          {formatNumber(totals[col.key as keyof typeof totals])}
                        </td>
                      ))}
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Columns Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[4px] w-full max-w-[900px] max-h-[90vh] flex flex-col" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <PencilIcon size={24} className="text-[#525965]" />
                <h2 className="text-[20px] font-semibold text-[#32373F]">Edit columns</h2>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close modal"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Search Input */}
            <div className="px-6 pb-4">
              <div
                className="flex items-center gap-3 px-3"
                style={{
                  backgroundColor: '#F5F5F5',
                  borderBottom: '1px solid #ACACAC',
                  height: '44px'
                }}
              >
                <SearchIcon size={20} className="text-[#707070] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[14px]"
                  style={{
                    color: '#32373F',
                    fontFamily: 'Noto Sans',
                  }}
                />
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="flex-1 px-6 pb-4 overflow-hidden">
              <div className="grid grid-cols-2 gap-6 h-full">
                {/* Available Column */}
                <div className="flex flex-col">
                  <h3 className="text-[14px] font-semibold text-[#32373F] mb-2">Available</h3>
                  <div className="flex-1 border border-[#D1D1D1] rounded-[4px] overflow-y-auto" style={{ backgroundColor: '#ffffff', maxHeight: '400px' }}>
                    {filteredGroups.map((group, groupIndex) => (
                      <div key={groupIndex}>
                        {/* Group Header */}
                        <div className="px-4 py-2 bg-[#EDF1F5] border-b border-[#D1D1D1]">
                          <span className="text-[13px] font-semibold text-[#32373F]">{group.label}</span>
                        </div>
                        {/* Group Items */}
                        {group.options.map((col) => {
                          const isSelected = tempSelectedColumns.includes(col.key);
                          return (
                            <button
                              key={col.key}
                              onClick={() => toggleTempColumn(col.key)}
                              className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors border-b border-[#E8E8E8] ${!isSelected ? 'hover:bg-[#e8e8e8]' : ''}`}
                              style={{
                                backgroundColor: isSelected ? '#E0F3FE' : undefined,
                                borderLeft: isSelected ? '4px solid #3560C1' : '4px solid transparent',
                                color: isSelected ? '#707070' : '#32373F',
                                fontFamily: 'Noto Sans',
                                fontSize: '14px',
                              }}
                            >
                              {isSelected ? (
                                <CheckboxCheckedFilled32Icon size={20} color="#3560C1" />
                              ) : (
                                <Checkbox32Icon size={20} color="#707070" />
                              )}
                              <span style={{ opacity: isSelected ? 0.6 : 1 }}>{col.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                    {filteredGroups.length === 0 && (
                      <div className="px-4 py-6 text-center text-[14px] text-[#707070]">
                        No items match your filter
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected Column */}
                <div className="flex flex-col">
                  <h3 className="text-[14px] font-semibold text-[#32373F] mb-2">Selected</h3>
                  <div className="flex-1 border border-[#D1D1D1] rounded-[4px] overflow-y-auto" style={{ backgroundColor: '#ffffff', maxHeight: '400px' }}>
                    {/* Fields Header */}
                    <div className="px-4 py-2 bg-[#EDF1F5] border-b border-[#D1D1D1]">
                      <span className="text-[13px] font-semibold text-[#32373F]">Fields</span>
                    </div>

                    {/* Locked Month Field */}
                    <div
                      className="flex items-center gap-3 w-full px-4 py-3 border-b border-[#E8E8E8]"
                      style={{
                        backgroundColor: '#EDF1F5',
                        color: '#707070',
                        fontFamily: 'Noto Sans',
                        fontSize: '14px',
                      }}
                    >
                      <CheckboxCheckedFilled32Icon size={20} color="#707070" />
                      <span style={{ opacity: 0.6 }}>{lockedField.label}</span>
                    </div>

                    {/* Selected Fields */}
                    {selectedColumnObjects.map((col) => (
                      <div
                        key={col.key}
                        className="flex items-center gap-2 w-full px-2 py-3 border-b border-[#E8E8E8] cursor-move"
                        style={{
                          backgroundColor: '#E0F3FE',
                          borderLeft: '4px solid #3560C1',
                          fontFamily: 'Noto Sans',
                          fontSize: '14px',
                        }}
                      >
                        <DragHandleIcon size={16} className="text-[#707070] flex-shrink-0" />
                        <CheckboxCheckedFilled32Icon size={20} color="#3560C1" className="flex-shrink-0" />
                        <span className="flex-1 text-[#32373F]">{col.label}</span>
                      </div>
                    ))}

                    {selectedColumnObjects.length === 0 && (
                      <div className="px-4 py-6 text-center text-[14px] text-[#707070]">
                        Select columns from Available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#EDF1F5]">
              <button
                onClick={closeModal}
                className="text-[#32373F] font-medium text-[14px] hover:underline transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={applyColumns}
                className="px-5 py-2 bg-[#3560C1] text-white font-medium text-[14px] hover:bg-[#274a96] transition-colors rounded-[4px]"
              >
                Apply changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminOverviewPage;
