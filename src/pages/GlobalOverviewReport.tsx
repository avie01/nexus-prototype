import { useState } from 'react';
import { ChartBarIcon } from '../components/icons';
import CarbonDropdown from '../components/ui/CarbonDropdown';

const GlobalOverviewReport = () => {
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [yearValue, setYearValue] = useState('');

  const yearOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' },
    { value: 'all', label: 'All Years' },
  ];

  // Sample monthly data
  const monthlyData = [
    { month: 'Jan-24', searchesCreated: 16, emailsSaved: 8806, docsIncEmail: 21447, docsExcEmail: 12641, docsGlobalFolder: 18464, docsHomeFolders: 2660, newVersions: 0, physicalCreated: 0, virtualCreated: 266, virtualClosed: 773, physicalOpened: 3 },
    { month: 'Feb-24', searchesCreated: 49, emailsSaved: 10582, docsIncEmail: 25593, docsExcEmail: 15011, docsGlobalFolder: 23009, docsHomeFolders: 1058, newVersions: 0, physicalCreated: 0, virtualCreated: 233, virtualClosed: 135, physicalOpened: 23 },
    { month: 'Mar-24', searchesCreated: 18, emailsSaved: 9716, docsIncEmail: 21917, docsExcEmail: 12201, docsGlobalFolder: 21077, docsHomeFolders: 607, newVersions: 15274, physicalCreated: 0, virtualCreated: 326, virtualClosed: 32, physicalOpened: 1 },
    { month: 'Apr-24', searchesCreated: 41, emailsSaved: 10063, docsIncEmail: 23364, docsExcEmail: 13301, docsGlobalFolder: 23009, docsHomeFolders: 906, newVersions: 14496, physicalCreated: 0, virtualCreated: 267, virtualClosed: 70, physicalOpened: 9 },
    { month: 'May-24', searchesCreated: 40, emailsSaved: 10734, docsIncEmail: 24647, docsExcEmail: 13913, docsGlobalFolder: 22419, docsHomeFolders: 1054, newVersions: 15233, physicalCreated: 1, virtualCreated: 393, virtualClosed: 255, physicalOpened: 9 },
    { month: 'Jun-24', searchesCreated: 28, emailsSaved: 9393, docsIncEmail: 19929, docsExcEmail: 10536, docsGlobalFolder: 18813, docsHomeFolders: 912, newVersions: 12633, physicalCreated: 0, virtualCreated: 393, virtualClosed: 752, physicalOpened: 4 },
    { month: 'Jul-24', searchesCreated: 26, emailsSaved: 9636, docsIncEmail: 22602, docsExcEmail: 12966, docsGlobalFolder: 21665, docsHomeFolders: 685, newVersions: 22501, physicalCreated: 1, virtualCreated: 312, virtualClosed: 307, physicalOpened: 4 },
    { month: 'Aug-24', searchesCreated: 21, emailsSaved: 8423, docsIncEmail: 21097, docsExcEmail: 12674, docsGlobalFolder: 20042, docsHomeFolders: 831, newVersions: 13920, physicalCreated: 0, virtualCreated: 273, virtualClosed: 161, physicalOpened: 3 },
    { month: 'Sep-24', searchesCreated: 10, emailsSaved: 8395, docsIncEmail: 17938, docsExcEmail: 9543, docsGlobalFolder: 16787, docsHomeFolders: 869, newVersions: 14065, physicalCreated: 0, virtualCreated: 268, virtualClosed: 366, physicalOpened: 0 },
    { month: 'Oct-24', searchesCreated: 25, emailsSaved: 9540, docsIncEmail: 21510, docsExcEmail: 11970, docsGlobalFolder: 19878, docsHomeFolders: 1339, newVersions: 17992, physicalCreated: 0, virtualCreated: 216, virtualClosed: 160, physicalOpened: 3 },
    { month: 'Nov-24', searchesCreated: 10, emailsSaved: 8910, docsIncEmail: 22448, docsExcEmail: 13538, docsGlobalFolder: 21428, docsHomeFolders: 714, newVersions: 15964, physicalCreated: 0, virtualCreated: 251, virtualClosed: 304, physicalOpened: 9 },
    { month: 'Dec-24', searchesCreated: 9, emailsSaved: 7627, docsIncEmail: 27242, docsExcEmail: 19615, docsGlobalFolder: 26440, docsHomeFolders: 614, newVersions: 11020, physicalCreated: 0, virtualCreated: 217, virtualClosed: 334, physicalOpened: 0 },
  ];

  // Calculate year totals
  const yearTotals = monthlyData.reduce((acc, row) => ({
    searchesCreated: acc.searchesCreated + row.searchesCreated,
    emailsSaved: acc.emailsSaved + row.emailsSaved,
    docsIncEmail: acc.docsIncEmail + row.docsIncEmail,
    docsExcEmail: acc.docsExcEmail + row.docsExcEmail,
    docsGlobalFolder: acc.docsGlobalFolder + row.docsGlobalFolder,
    docsHomeFolders: acc.docsHomeFolders + row.docsHomeFolders,
    newVersions: acc.newVersions + row.newVersions,
    physicalCreated: acc.physicalCreated + row.physicalCreated,
    virtualCreated: acc.virtualCreated + row.virtualCreated,
    virtualClosed: acc.virtualClosed + row.virtualClosed,
    physicalOpened: acc.physicalOpened + row.physicalOpened,
  }), {
    searchesCreated: 0, emailsSaved: 0, docsIncEmail: 0, docsExcEmail: 0,
    docsGlobalFolder: 0, docsHomeFolders: 0, newVersions: 0, physicalCreated: 0,
    virtualCreated: 0, virtualClosed: 0, physicalOpened: 0
  });

  // Grand totals (simulating multi-year data)
  const grandTotals = {
    searchesCreated: 8942,
    emailsSaved: 2192663,
    docsIncEmail: 5757412,
    docsExcEmail: 3564749,
    docsGlobalFolder: 4508421,
    docsHomeFolders: 1259912,
    newVersions: 4771489,
    physicalCreated: 13762,
    virtualCreated: 83252,
    virtualClosed: 31577,
    physicalOpened: 91476,
  };

  const formatNumber = (num: number) => num.toLocaleString();

  const SkeletonCell = ({ width = '100%' }: { width?: string }) => (
    <div className="skeleton-animate h-4 rounded" style={{ width }} />
  );

  const columns = [
    { key: 'month', label: 'Month', align: 'left' as const },
    { key: 'searchesCreated', label: 'Searches Created', align: 'right' as const },
    { key: 'emailsSaved', label: 'eMails Saved', align: 'right' as const },
    { key: 'docsIncEmail', label: 'Documents Created (Inc. eMail)', align: 'right' as const },
    { key: 'docsExcEmail', label: 'Documents Created (Exc. eMail)', align: 'right' as const },
    { key: 'docsGlobalFolder', label: 'Docs in Global Folder', align: 'right' as const },
    { key: 'docsHomeFolders', label: 'Docs in Home Folders', align: 'right' as const },
    { key: 'newVersions', label: 'New Versions Created', align: 'right' as const },
    { key: 'physicalCreated', label: 'Physical Parts Created', align: 'right' as const },
    { key: 'virtualCreated', label: 'Virtual Parts Created', align: 'right' as const },
    { key: 'virtualClosed', label: 'Virtual Parts Closed', align: 'right' as const },
    { key: 'physicalOpened', label: 'Physical Parts Opened', align: 'right' as const },
  ];

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
            <ChartBarIcon size={20} aria-hidden="true" />
            Global Overview
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Monthly statistics across all report categories</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <CarbonDropdown
              id="yearSelect"
              label="Year"
              placeholder="Select year..."
              options={yearOptions}
              value={yearValue}
              onChange={setYearValue}
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
          <button className="hover:bg-gray-50" style={{ display: 'inline-flex', height: '32px', padding: '6px 12px', alignItems: 'center', borderRadius: '2px', border: '1px solid #D1D1D1', background: '#FFF', color: '#525965', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Export results</button>
        </div>
      )}

      {showTable && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px]" role="table">
              <thead>
                <tr className="border-b border-gray-200" style={{ borderTop: '1px solid #d1d1d1' }}>
                  {columns.map((col, idx) => (
                    <th
                      key={col.key}
                      className={`py-3 px-4 ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                      style={{ borderRight: idx < columns.length - 1 ? '1px solid #EDF1F5' : undefined, color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}
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
                      {columns.map((col, idx) => (
                        <td key={col.key} className="py-3 px-4" style={{ borderRight: idx < columns.length - 1 ? '1px solid #EDF1F5' : undefined }}>
                          <SkeletonCell width={col.key === 'month' ? '60px' : '80px'} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <>
                    {monthlyData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-[#E8E8E8] transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.month}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.searchesCreated)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.emailsSaved)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.docsIncEmail)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.docsExcEmail)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.docsGlobalFolder)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.docsHomeFolders)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.newVersions)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.physicalCreated)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.virtualCreated)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(row.virtualClosed)}</td>
                        <td className="py-3 px-4 text-sm text-gray-900 text-right">{formatNumber(row.physicalOpened)}</td>
                      </tr>
                    ))}
                    {/* Year Totals Row */}
                    <tr className="border-b border-gray-300 bg-gray-50 font-semibold">
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>2024 TOTALS</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.searchesCreated)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.emailsSaved)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.docsIncEmail)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.docsExcEmail)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.docsGlobalFolder)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.docsHomeFolders)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.newVersions)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.physicalCreated)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.virtualCreated)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(yearTotals.virtualClosed)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{formatNumber(yearTotals.physicalOpened)}</td>
                    </tr>
                    {/* Grand Total Row */}
                    <tr className="bg-gray-100 font-bold">
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>GRAND TOTAL</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.searchesCreated)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.emailsSaved)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.docsIncEmail)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.docsExcEmail)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.docsGlobalFolder)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.docsHomeFolders)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.newVersions)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.physicalCreated)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.virtualCreated)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right" style={{ borderRight: '1px solid #EDF1F5' }}>{formatNumber(grandTotals.virtualClosed)}</td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">{formatNumber(grandTotals.physicalOpened)}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};

export default GlobalOverviewReport;
