import React from 'react';
import { 
  DocumentIcon, 
  ClipboardListIcon, 
  BuildingIcon, 
  UsersIcon, 
  PenIcon,
  FormatEditIcon
} from './icons';

interface ApplicationProgressSidebarProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Uploads', icon: FormatEditIcon },
  { id: 2, label: 'Project', icon: ClipboardListIcon },
  { id: 3, label: 'Property', icon: BuildingIcon },
  { id: 4, label: 'People and roles', icon: UsersIcon },
  { id: 5, label: 'Review', icon: DocumentIcon },
];

export const ApplicationProgressSidebar: React.FC<ApplicationProgressSidebarProps> = ({ currentStep }) => {
  return (
    <aside className="flex-shrink-0 bg-white flex flex-col w-[290px] h-screen">
      <div className="bg-white shadow-sm flex flex-col flex-1 min-h-0">
        <h2 className="text-[18px] font-semibold text-gray-900 mb-8">Application Progress</h2>
        <nav className="flex flex-col">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;
            return (
              <div key={step.id} className="flex items-start relative">
                {/* Step circle and vertical line */}
                <div className="flex flex-col items-center mr-5">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all
                    ${isActive ? 'bg-[#3560C1] border-[#3560C1] text-white' :
                      isCompleted ? 'bg-white border-[#3560C1] text-[#3560C1]' :
                      'bg-white border-gray-300 text-gray-400'}
                  `}>
                    {isActive ? (
                      <IconComponent size={20} className="text-white" />
                    ) : isCompleted ? (
                      <span className="text-[14px] font-normal">{step.id}</span>
                    ) : (
                      <span className="text-[14px] font-normal">{step.id}</span>
                    )}
                  </div>
                  {/* Vertical line */}
                  {index < steps.length - 1 && (
                    <div className="w-px flex-1 bg-[#E5E7EB]" style={{ minHeight: '32px' }} />
                  )}
                </div>
                {/* Step label */}
                <div className="pt-1">
                  <span className={`block text-base font-medium transition-colors
                    ${step.label === 'Uploads' ? 'text-[#525965] mt-[2px]' : isActive ? 'text-[#3560C1]' : 'text-gray-700'}
                  `}>
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}; 