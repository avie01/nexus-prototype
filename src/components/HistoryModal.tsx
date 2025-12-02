import React from 'react';
import { XIcon, PlusIcon, MinusIcon, ArrowRightIcon } from './icons';

interface HistoryChange {
  date: string;
  modifiedBy: string;
  details: string | string[];
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  historyData: HistoryChange[];
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  teamName, 
  historyData 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            History - {teamName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XIcon size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-6">
          <div className="bg-white rounded-lg" style={{ minWidth: 0 }}>
            <table className="w-full max-w-full table-fixed">
              <colgroup>
                <col style={{ width: '100px' }} />
                <col style={{ width: '180px' }} />
                <col style={{ width: 'auto' }} />
              </colgroup>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider break-words whitespace-normal">
                    Date
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    Modified by
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historyData.map((change, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-4 text-sm text-gray-900 align-top break-words whitespace-normal">
                      {change.date}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900 align-top break-words whitespace-normal">
                      {change.modifiedBy}
                    </td>
                    <td className="px-3 py-4 text-base text-gray-900 align-top">
                      {Array.isArray(change.details) ? (
                        <ul className="list-none pl-0 space-y-4">
                          {change.details.map((item, i) => {
                            let actionIcon = null;
                            let actionColor = '';
                            let label = '';
                            const changedMatch = item.match(/^(.*?):\s*"(.*?)"\s*→\s*"(.*?)"$/);
                            if (changedMatch) {
                              actionIcon = <ArrowRightIcon size={18} className="inline-block text-blue-500 mr-2 align-middle" />;
                              actionColor = 'bg-blue-50 border-blue-200';
                              label = `${changedMatch[1]} changed from "${changedMatch[2]}" to "${changedMatch[3]}"`;
                            } else if (/added/i.test(item)) {
                              actionIcon = <PlusIcon size={18} className="inline-block text-green-600 mr-2 align-middle" />;
                              actionColor = 'bg-green-50 border-green-200';
                              label = item.replace(/added/i, 'Added');
                            } else if (/removed|deleted/i.test(item)) {
                              actionIcon = <MinusIcon size={18} className="inline-block text-red-500 mr-2 align-middle" />;
                              actionColor = 'bg-red-50 border-red-200';
                              label = item.replace(/removed|deleted/i, 'Removed');
                            } else {
                              actionIcon = <ArrowRightIcon size={18} className="inline-block text-gray-400 mr-2 align-middle" />;
                              actionColor = 'bg-gray-50 border-gray-200';
                              label = item;
                            }
                            return (
                              <li key={i} className={`flex items-center rounded-lg border ${actionColor} px-4 py-3 shadow-sm`}>
                                {actionIcon}
                                <span className="ml-1 text-gray-800 font-medium">{label}</span>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <span className="block bg-gray-50 rounded-lg px-4 py-3 text-gray-800 font-medium shadow-sm">{change.details}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}; 