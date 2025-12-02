import React from 'react';
import { BuildingIcon, XIcon } from './icons';
import buildingImg from '../assets/building.png';

interface AccessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDecline: () => void;
}

const AccessRequestModal: React.FC<AccessRequestModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onDecline,
}) => {
  if (!isOpen) return null;

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7); // 7 days from now

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[4px] w-full max-w-[670px] max-h-[90vh] overflow-y-auto border border-[#3560C1]">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-[18px] font-semibold text-[#32373F]">Respond to request for access</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Project Summary Card */}
          <h3 className="text-[16px] font-semibold text-gray-800 mb-1">Project details</h3>
          <div className="rounded-[4px] p-4 border border-[#D1D1D1]">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <img src={buildingImg} alt="Building" className="w-12 h-12 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[16px] font-bold text-[#32373F] mb-1">
                  BC2024019876
                </div>
                <div className="text-sm text-gray-600 mb-1">
                  Building Consent
                </div>
                <div className="text-sm text-gray-600">
                  88 Onerahi Road, Onerahi, Whangarei 0110
                </div>
              </div>
            </div>
          </div>

          {/* Requester Details */}
          <h3 className="text-[16px] font-semibold text-gray-800 mt-4 mb-3">Requester details</h3>
          <div className="mb-6 space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 font-medium w-[150px]">Full name</span>
              <span className="text-sm text-[#32373F]">John Donne</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 font-medium w-[150px]">Email</span>
              <span className="text-sm text-[#32373F]">john.donne@example.com</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 font-medium w-[150px]">Phone</span>
              <span className="text-sm text-[#32373F]">0453 890 987</span>
            </div>
          </div>

          {/* Informative Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-[4px] p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              If you accept the request, you can then add John Donne as a participant on the project.<br />
              If you decline, John Donne is notified and you do not need to take further action.<br />
              The request will expire automatically on {expiryDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}.
            </p>
          </div>
        </div>

        {/* Footer with Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 bg-[#EDF1F5] gap-3">
          <button
            onClick={onClose}
            className="sm:order-1 text-gray-700 px-4 py-2 rounded-[2px] font-medium text-[14px] hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 h-8 flex items-center justify-center"
            style={{ minWidth: 90 }}
          >
            Cancel
          </button>
          <div className="flex gap-4 sm:order-2 ml-auto">
            <button
              onClick={onDecline}
              className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-[2px] font-medium text-[14px] hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 h-8 flex items-center justify-center"
              style={{ minWidth: 90 }}
            >
              Decline
            </button>
            <button
              onClick={onAccept}
              className="bg-[#3560C1] text-white px-4 py-2 rounded-[2px] font-medium text-[14px] hover:bg-[#274a96] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3560C1] focus:ring-offset-2 h-8 flex items-center justify-center"
              style={{ minWidth: 90 }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessRequestModal; 