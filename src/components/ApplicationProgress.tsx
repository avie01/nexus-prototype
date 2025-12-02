import React from 'react';
import { 
  DocumentIcon, 
  ClipboardListIcon, 
  BuildingIcon, 
  UsersIcon, 
  FormatEditIcon
} from './icons';

interface ApplicationProgressProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Uploads', icon: FormatEditIcon },
  { id: 2, label: 'Project', icon: ClipboardListIcon },
  { id: 3, label: 'Property', icon: BuildingIcon },
  { id: 4, label: 'People and roles', icon: UsersIcon },
  { id: 5, label: 'Review', icon: DocumentIcon },
];

export const ApplicationProgress: React.FC<ApplicationProgressProps> = ({ currentStep }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-64 pt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Application Progress</h2>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          // const isUpcoming = step.id > currentStep;
          
          return (
            <div key={step.id} className="flex items-start">
              {/* Step circle and line */}
              <div className="flex flex-col items-center mr-4">
                {/* Step circle */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center border-2
                  ${isActive 
                    ? 'bg-[#3560C1] border-[#3560C1] text-white' 
                    : isCompleted 
                    ? 'bg-[#3560C1] border-[#3560C1] text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                  }
                `}>
                  {isActive ? (
                    <IconComponent size={16} className="text-white" />
                  ) : isCompleted ? (
                    <IconComponent size={16} className="text-white" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                
                {/* Vertical line */}
                {index < steps.length - 1 && (
                  <div className={`
                    w-0.5 h-8 mt-2
                    ${isCompleted ? 'bg-[#3560C1]' : 'bg-gray-200'}
                  `} />
                )}
              </div>
              
              {/* Step label */}
              <div className="flex-1 pt-1">
                <span className={`
                  text-sm font-medium
                  ${isActive 
                    ? 'text-[#3560C1]' 
                    : isCompleted 
                    ? 'text-[#3560C1]'
                    : 'text-gray-500'
                  }
                `}>
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 