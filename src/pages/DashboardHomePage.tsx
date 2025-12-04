import { useState, useEffect } from 'react';
import { GroupSecurityIcon, User32Icon, Events32Icon, Search32Icon, DocumentBlank32Icon, Folders32Icon, FolderIcon, Close32Icon, Information32Icon, TextSelection32Icon, Security32Icon, TrashCan32Icon } from '../components/icons';
import CarbonDropdown from '../components/ui/CarbonDropdown';
import { Badge } from '../components/ui/Badge';



const DashboardHomePage = () => {
  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [activeActionMenu, setActiveActionMenu] = useState<number | null>(null);
  
  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({
    objectId: true,
    parentId: true,
    name: true,
    see: true,
    open: true,
    create: true,
    edit: true,
    delete: true,
    security: true,
    admin: true,
    userGroupId: true,
    userGroupName: true,
    classification: true
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Form state
  const [typeValues, setTypeValues] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [objectTypesValue, setObjectTypesValue] = useState('');
  const [usersGroupsValue, setUsersGroupsValue] = useState('');
  const [classificationValue, setClassificationValue] = useState('');


  const sampleData = [
    {
      objectId: 'OBJ001',
      parentId: 'PAR001',
      name: 'Financial Report 2023',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'Yes',
      delete: 'No',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG001',
      userGroupName: 'Finance Team',
      classification: 'Official'
    },
    {
      objectId: 'OBJ002',
      parentId: 'PAR002',
      name: 'HR Documents',
      see: 'Yes',
      open: 'No',
      create: 'Yes',
      edit: 'Yes',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG002',
      userGroupName: 'HR Department',
      classification: 'Protected'
    },
    {
      objectId: 'OBJ003',
      parentId: 'PAR001',
      name: 'Project Files',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'Yes',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG003',
      userGroupName: 'Project Managers',
      classification: 'Official sensitive'
    },
    {
      objectId: 'OBJ004',
      parentId: 'PAR003',
      name: 'Security Protocols',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG005',
      userGroupName: 'Security Team',
      classification: 'Secret'
    },
    {
      objectId: 'OBJ005',
      parentId: 'PAR004',
      name: 'Employee Records',
      see: 'Yes',
      open: 'No',
      create: 'No',
      edit: 'Yes',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG002',
      userGroupName: 'HR Department',
      classification: 'Protected'
    },
    {
      objectId: 'OBJ006',
      parentId: 'PAR005',
      name: 'Marketing Materials',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'Yes',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG006',
      userGroupName: 'Marketing Team',
      classification: 'Official'
    },
    {
      objectId: 'OBJ007',
      parentId: 'PAR006',
      name: 'Legal Contracts',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG007',
      userGroupName: 'Legal Department',
      classification: 'Official sensitive'
    },
    {
      objectId: 'OBJ008',
      parentId: 'PAR007',
      name: 'IT Infrastructure',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG004',
      userGroupName: 'Administrators',
      classification: 'Protected'
    },
    {
      objectId: 'OBJ009',
      parentId: 'PAR008',
      name: 'Customer Database',
      see: 'Yes',
      open: 'No',
      create: 'No',
      edit: 'Yes',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG008',
      userGroupName: 'Sales Team',
      classification: 'Protected'
    },
    {
      objectId: 'OBJ010',
      parentId: 'PAR009',
      name: 'Training Videos',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'No',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG009',
      userGroupName: 'Training Department',
      classification: 'Unofficial'
    },
    {
      objectId: 'OBJ011',
      parentId: 'PAR010',
      name: 'Executive Reports',
      see: 'No',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'No',
      admin: 'Yes',
      userGroupId: 'UG010',
      userGroupName: 'Executive Team',
      classification: 'Top Secret'
    },
    {
      objectId: 'OBJ012',
      parentId: 'PAR011',
      name: 'Backup Systems',
      see: 'Yes',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG004',
      userGroupName: 'Administrators',
      classification: 'Secret'
    },
    {
      objectId: 'OBJ013',
      parentId: 'PAR012',
      name: 'Public Documents',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'Yes',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG011',
      userGroupName: 'Public Relations',
      classification: 'Unofficial'
    },
    {
      objectId: 'OBJ014',
      parentId: 'PAR013',
      name: 'Budget Reports',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'Yes',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG001',
      userGroupName: 'Finance Team',
      classification: 'Official sensitive'
    },
    {
      objectId: 'OBJ015',
      parentId: 'PAR014',
      name: 'Strategy Documents',
      see: 'No',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG010',
      userGroupName: 'Executive Team',
      classification: 'Secret'
    },
    {
      objectId: 'OBJ016',
      parentId: 'PAR015',
      name: 'Employee Handbook',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG002',
      userGroupName: 'HR Department',
      classification: 'Official'
    },
    {
      objectId: 'OBJ017',
      parentId: 'PAR016',
      name: 'System Logs',
      see: 'Yes',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG004',
      userGroupName: 'Administrators',
      classification: 'Protected'
    },
    {
      objectId: 'OBJ018',
      parentId: 'PAR017',
      name: 'Marketing Campaign',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'Yes',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG006',
      userGroupName: 'Marketing Team',
      classification: 'Unofficial'
    },
    {
      objectId: 'OBJ019',
      parentId: 'PAR018',
      name: 'Research Data',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG012',
      userGroupName: 'Research Team',
      classification: 'Protected'
    },
    {
      objectId: 'OBJ020',
      parentId: 'PAR019',
      name: 'Compliance Reports',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG007',
      userGroupName: 'Legal Department',
      classification: 'Official sensitive'
    },
    {
      objectId: 'OBJ021',
      parentId: 'PAR020',
      name: 'Network Config',
      see: 'No',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG004',
      userGroupName: 'Administrators',
      classification: 'Secret'
    },
    {
      objectId: 'OBJ022',
      parentId: 'PAR021',
      name: 'Sales Forecasts',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'No',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG008',
      userGroupName: 'Sales Team',
      classification: 'Official'
    },
    {
      objectId: 'OBJ023',
      parentId: 'PAR022',
      name: 'Board Minutes',
      see: 'No',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG010',
      userGroupName: 'Executive Team',
      classification: 'Top Secret'
    },
    {
      objectId: 'OBJ024',
      parentId: 'PAR023',
      name: 'Product Specs',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'No',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG013',
      userGroupName: 'Product Team',
      classification: 'Official'
    },
    {
      objectId: 'OBJ025',
      parentId: 'PAR024',
      name: 'Audit Reports',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG014',
      userGroupName: 'Audit Team',
      classification: 'Protected'
    },
    {
      objectId: 'OBJ026',
      parentId: 'PAR025',
      name: 'Press Releases',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'Yes',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG011',
      userGroupName: 'Public Relations',
      classification: 'Unofficial'
    },
    {
      objectId: 'OBJ027',
      parentId: 'PAR026',
      name: 'Security Incidents',
      see: 'No',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG005',
      userGroupName: 'Security Team',
      classification: 'Secret'
    },
    {
      objectId: 'OBJ028',
      parentId: 'PAR027',
      name: 'Training Schedule',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'No',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG009',
      userGroupName: 'Training Department',
      classification: 'Official'
    },
    {
      objectId: 'OBJ029',
      parentId: 'PAR028',
      name: 'Vendor Contracts',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG015',
      userGroupName: 'Procurement',
      classification: 'Official sensitive'
    },
    {
      objectId: 'OBJ030',
      parentId: 'PAR029',
      name: 'Quality Standards',
      see: 'Yes',
      open: 'Yes',
      create: 'No',
      edit: 'Yes',
      delete: 'No',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG016',
      userGroupName: 'Quality Team',
      classification: 'Official'
    },
    {
      objectId: 'OBJ031',
      parentId: 'PAR030',
      name: 'Disaster Recovery',
      see: 'Yes',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'Yes',
      userGroupId: 'UG004',
      userGroupName: 'Administrators',
      classification: 'Protected'
    },
    {
      objectId: 'OBJ032',
      parentId: 'PAR031',
      name: 'Patent Documents',
      see: 'No',
      open: 'No',
      create: 'No',
      edit: 'No',
      delete: 'No',
      security: 'Yes',
      admin: 'No',
      userGroupId: 'UG007',
      userGroupName: 'Legal Department',
      classification: 'Secret'
    },
    {
      objectId: 'OBJ033',
      parentId: 'PAR032',
      name: 'Newsletter Archive',
      see: 'Yes',
      open: 'Yes',
      create: 'Yes',
      edit: 'Yes',
      delete: 'Yes',
      security: 'No',
      admin: 'No',
      userGroupId: 'UG006',
      userGroupName: 'Marketing Team',
      classification: 'Unofficial'
    }
  ];
  
  // Filtered data
  const [filteredData, setFilteredData] = useState(sampleData);

  // Handle click outside to close action menu
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeActionMenu !== null) {
        setActiveActionMenu(null);
      }
    };

    if (activeActionMenu !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeActionMenu]);

  // Apply filters whenever dependencies change
  useEffect(() => {
    let filtered = [...sampleData];
    
    // Filter by Users/Groups
    if (usersGroupsValue) {
      // Find the selected user/group from the dropdown options
      const usersOptions = [
        { value: 'john.doe', label: 'John Doe', secondaryText: 'ID: uA321' },
        { value: 'jane.smith', label: 'Jane Smith', secondaryText: 'ID: uB457' },
        { value: 'mike.johnson', label: 'Mike Johnson', secondaryText: 'ID: uC892' },
        { value: 'sarah.wilson', label: 'Sarah Wilson', secondaryText: 'ID: uD234' },
        { value: 'alex.brown', label: 'Alex Brown', secondaryText: 'ID: uE567' }
      ];
      
      const groupsOptions = [
        { value: 'administrators', label: 'Administrators', secondaryText: 'ID: gA123' },
        { value: 'finance-team', label: 'Finance Team', secondaryText: 'ID: gB789' },
        { value: 'hr-department', label: 'HR Department', secondaryText: 'ID: gC456' },
        { value: 'project-managers', label: 'Project Managers', secondaryText: 'ID: gD012' },
        { value: 'security-team', label: 'Security Team', secondaryText: 'ID: gE345' }
      ];
      
      const allOptions = [...usersOptions, ...groupsOptions];
      const selectedOption = allOptions.find(opt => opt.value === usersGroupsValue);
      
      if (selectedOption) {
        // Extract the ID from the secondaryText (e.g., "ID: uA321" -> "uA321")
        const selectedId = selectedOption.secondaryText?.replace('ID: ', '') || '';
        
        // Update all items to use the selected user/group's ID and name
        filtered = filtered.map(item => ({
          ...item,
          userGroupId: selectedId,
          userGroupName: selectedOption.label
        }));
      }
    }
    
    // Filter by Classification
    if (classificationValue) {
      const classificationMap: { [key: string]: string } = {
        'unofficial': 'Unofficial',
        'official': 'Official',
        'official-sensitive': 'Official sensitive',
        'protected': 'Protected',
        'secret': 'Secret',
        'top-secret': 'Top Secret'
      };
      
      const selectedClassification = classificationMap[classificationValue];
      if (selectedClassification) {
        filtered = filtered.filter(item => item.classification === selectedClassification);
      }
    }
    
    // Apply privilege modifications
    if (selectedPrivileges.length > 0) {
      filtered = filtered.map(item => {
        const modifiedItem = { ...item };
        
        // Apply permissions
        if (selectedPrivileges.includes('can-see')) modifiedItem.see = 'Yes';
        if (selectedPrivileges.includes('can-open')) modifiedItem.open = 'Yes';
        if (selectedPrivileges.includes('can-create')) modifiedItem.create = 'Yes';
        if (selectedPrivileges.includes('can-edit')) modifiedItem.edit = 'Yes';
        if (selectedPrivileges.includes('can-delete')) modifiedItem.delete = 'Yes';
        if (selectedPrivileges.includes('can-edit-security')) modifiedItem.security = 'Yes';
        if (selectedPrivileges.includes('can-admin')) modifiedItem.admin = 'Yes';
        
        // Apply restrictions
        if (selectedPrivileges.includes('cant-see')) modifiedItem.see = 'No';
        if (selectedPrivileges.includes('cant-open')) modifiedItem.open = 'No';
        if (selectedPrivileges.includes('cant-create')) modifiedItem.create = 'No';
        if (selectedPrivileges.includes('cant-edit')) modifiedItem.edit = 'No';
        if (selectedPrivileges.includes('cant-delete')) modifiedItem.delete = 'No';
        if (selectedPrivileges.includes('cant-edit-security')) modifiedItem.security = 'No';
        if (selectedPrivileges.includes('cant-admin')) modifiedItem.admin = 'No';
        
        return modifiedItem;
      });
    }
    
    setFilteredData(filtered);
  }, [usersGroupsValue, classificationValue, selectedPrivileges]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Skeleton component for loading state
  const SkeletonCell = ({ width = '100%' }: { width?: string }) => (
    <div 
      className="skeleton-animate h-4 rounded"
      style={{ width }}
    />
  );

  const isRestrictionDisabled = (restriction: string) => {
    const privilegeMapping: { [key: string]: string } = {
      'cant-see': 'can-see',
      'cant-open': 'can-open',
      'cant-create': 'can-create',
      'cant-edit': 'can-edit',
      'cant-delete': 'can-delete',
      'cant-edit-security': 'can-edit-security',
      'cant-admin': 'can-admin'
    };
    return selectedPrivileges.includes(privilegeMapping[restriction]);
  };

  const getClassificationVariant = (classification: string): 'default' | 'success' | 'danger' | 'warning' | 'info' | 'error' => {
    const lowerClassification = classification.toLowerCase();
    if (lowerClassification.includes('top secret')) return 'error';
    if (lowerClassification.includes('secret')) return 'danger';
    if (lowerClassification.includes('protected')) return 'info';
    if (lowerClassification.includes('official sensitive')) return 'warning';
    if (lowerClassification.includes('official')) return 'success';
    return 'default';
  };


  return (
    <main>
      <style>{`
        input::placeholder {
          color: #707070 !important;
          font-family: "Noto Sans" !important;
          font-size: 14px !important;
          font-style: italic !important;
          font-weight: 400 !important;
          line-height: 24px !important;
        }
        
        @keyframes skeleton-loading {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .skeleton-animate {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
        }
        
        /* Enhanced focus indicators for accessibility */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        [role="combobox"]:focus-visible,
        [role="menuitem"]:focus-visible,
        [tabindex]:focus-visible {
          outline: 3px solid #3560C1 !important;
          outline-offset: 2px !important;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          button:focus-visible,
          a:focus-visible,
          input:focus-visible,
          [role="combobox"]:focus-visible,
          [role="menuitem"]:focus-visible,
          [tabindex]:focus-visible {
            outline: 3px solid currentColor !important;
          }
        }
      `}</style>
      <div className="p-6" style={{ backgroundColor: '#ffffff', borderRadius: showTable ? '16px 16px 0px 0px' : '16px' }}>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <GroupSecurityIcon size={20} aria-hidden="true" />
            Privilege reporting
          </h1>
          <p className="text-gray-600">Last privilege update: 14/12/2017 4:56 PM</p>
        </div>
        <div className="grid grid-cols-[379px_1fr_80px] gap-4 mt-4">
          <div>
            <CarbonDropdown
              id="type"
              label="Hierarchy Depth"
              placeholder="Select type..."
              options={[
                { value: 'parent', label: 'Parent', icon: FolderIcon },
                { value: 'ancestor', label: 'Ancestor', icon: FolderIcon }
              ]}
              multiple={true}
              values={typeValues}
              onMultiChange={setTypeValues}
            />
          </div>
          <div>
            <label htmlFor="search" className="block mb-1" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Privilege Container</label>
            <input
              type="text"
              id="search"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-3 focus:outline-none hover:bg-[#E8E8E8] hover:border-[#3560C1] active:bg-[#E8E8E8] active:border-[#3560C1] transition-all"
              style={{ 
                border: '1px solid transparent',
                borderBottom: '1px solid #ACACAC', 
                background: '#F5F5F5', 
                height: '44px', 
                borderRadius: '0px',
                color: '#32373F',
                fontFamily: 'Noto Sans',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '24px'
              }}
              onFocus={(e) => {
                e.target.style.borderBottom = '1px solid #3560C1';
                e.target.style.background = '#E8E8E8';
              }}
              onBlur={(e) => {
                e.target.style.borderBottom = '1px solid #ACACAC';
                e.target.style.background = '#F5F5F5';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="block mb-1" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>&nbsp;</div>
            <button
              onClick={() => {
                setIsLoading(true);
                setShowTable(true);
                // Simulate loading delay
                setTimeout(() => {
                  setIsLoading(false);
                }, 1500);
              }}
              className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search privilege reporting data"
              style={{
                display: 'flex',
                height: '44px',
                width: '80px',
                padding: '10px 14px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                alignSelf: 'stretch',
                borderRadius: '2px',
                background: '#3560C1',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div>
            <CarbonDropdown
              id="objectTypes"
              label="Object types"
              placeholder="Select object type..."
              options={[
                { value: 'all-objects', label: 'All objects', icon: Search32Icon },
                { value: 'documents', label: 'Documents', icon: DocumentBlank32Icon },
                { value: 'files', label: 'Files', icon: Folders32Icon },
                { value: 'file-or-folders', label: 'File or Folders', icon: FolderIcon },
                { value: 'folders', label: 'Folders', icon: FolderIcon }
              ]}
              value={objectTypesValue}
              onChange={setObjectTypesValue}
            />
          </div>
          <div>
            <CarbonDropdown
              id="usersGroups"
              label="Users/groups"
              placeholder="Select user/group..."
              groups={[
                {
                  label: 'Users',
                  icon: User32Icon,
                  options: [
                    { value: 'john.doe', label: 'John Doe', secondaryText: 'ID: uA321' },
                    { value: 'jane.smith', label: 'Jane Smith', secondaryText: 'ID: uB457' },
                    { value: 'mike.johnson', label: 'Mike Johnson', secondaryText: 'ID: uC892' },
                    { value: 'sarah.wilson', label: 'Sarah Wilson', secondaryText: 'ID: uD234' },
                    { value: 'alex.brown', label: 'Alex Brown', secondaryText: 'ID: uE567' }
                  ]
                },
                {
                  label: 'Groups',
                  icon: Events32Icon,
                  options: [
                    { value: 'administrators', label: 'Administrators', secondaryText: 'ID: gA123' },
                    { value: 'finance-team', label: 'Finance Team', secondaryText: 'ID: gB789' },
                    { value: 'hr-department', label: 'HR Department', secondaryText: 'ID: gC456' },
                    { value: 'project-managers', label: 'Project Managers', secondaryText: 'ID: gD012' },
                    { value: 'security-team', label: 'Security Team', secondaryText: 'ID: gE345' }
                  ]
                }
              ]}
              value={usersGroupsValue}
              onChange={setUsersGroupsValue}
            />
          </div>
          <div>
            <CarbonDropdown
              id="privilege"
              label="Privilege"
              placeholder="Select privilege..."
              multiple={true}
              groups={[
                {
                  label: 'Permissions',
                  options: [
                    { value: 'can-see', label: 'Can See' },
                    { value: 'can-open', label: 'Can Open' },
                    { value: 'can-create', label: 'Can Create' },
                    { value: 'can-edit', label: 'Can Edit' },
                    { value: 'can-delete', label: 'Can Delete' },
                    { value: 'can-edit-security', label: 'Can edit security' },
                    { value: 'can-admin', label: 'Can Admin' }
                  ]
                },
                {
                  label: 'Restrictions',
                  options: [
                    { value: 'cant-see', label: "Can't See", disabled: isRestrictionDisabled('cant-see') },
                    { value: 'cant-open', label: "Can't Open", disabled: isRestrictionDisabled('cant-open') },
                    { value: 'cant-create', label: "Can't Create", disabled: isRestrictionDisabled('cant-create') },
                    { value: 'cant-edit', label: "Can't Edit", disabled: isRestrictionDisabled('cant-edit') },
                    { value: 'cant-delete', label: "Can't Delete", disabled: isRestrictionDisabled('cant-delete') },
                    { value: 'cant-edit-security', label: "Can't edit security", disabled: isRestrictionDisabled('cant-edit-security') },
                    { value: 'cant-admin', label: "Can't Admin", disabled: isRestrictionDisabled('cant-admin') }
                  ]
                }
              ]}
              values={selectedPrivileges}
              onMultiChange={setSelectedPrivileges}
            />
          </div>
          <div>
            <CarbonDropdown
              id="classification"
              label="Classification"
              placeholder="Select classification..."
              options={[
                { value: 'unofficial', label: 'Unofficial' },
                { value: 'official', label: 'Official' },
                { value: 'official-sensitive', label: 'Official sensitive' },
                { value: 'protected', label: 'Protected' },
                { value: 'secret', label: 'Secret' },
                { value: 'top-secret', label: 'Top Secret' }
              ]}
              value={classificationValue}
              onChange={setClassificationValue}
              showAsChips={true}
            />
          </div>
        </div>
      </div>
      {showTable && (
        <div 
          className="flex items-center justify-between px-6" 
          style={{ 
            backgroundColor: '#f5f5f5', 
            height: '56px'
          }}
        >
          <span style={{ 
            color: 'var(--primary-obj-night, #32373F)', 
            fontFamily: 'Noto Sans', 
            fontSize: '14px', 
            fontStyle: 'normal',
            fontWeight: '400', 
            lineHeight: '130%'
          }}>
            Results ({filteredData.length})
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setShowColumnModal(true)}
              className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Edit table columns visibility"
              style={{
                display: 'inline-flex',
                height: '32px',
                padding: '6px 12px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '2px',
                border: '1px solid var(--grey-500-obj-light-deco, #D1D1D1)',
                background: 'var(--paper-obj-white-ff, #FFF)',
                color: 'var(--secondary-obj-twilight, #525965)',
                textAlign: 'center',
                fontFamily: 'Noto Sans',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '21px',
                cursor: 'pointer'
              }}
            >
              Edit columns
            </button>
            <button
              className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Export results to file"
              style={{
                display: 'inline-flex',
                height: '32px',
                padding: '6px 12px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '2px',
                border: '1px solid var(--grey-500-obj-light-deco, #D1D1D1)',
                background: 'var(--paper-obj-white-ff, #FFF)',
                color: 'var(--secondary-obj-twilight, #525965)',
                textAlign: 'center',
                fontFamily: 'Noto Sans',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '21px',
                cursor: 'pointer'
              }}
            >
              Export results
            </button>
          </div>
        </div>
      )}
      {showTable && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px' }}>
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Privilege reporting results">
              <thead>
                <tr className="border-b border-gray-200">
                  {columnVisibility.objectId && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Object ID</th>}
                  {columnVisibility.parentId && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Parent ID</th>}
                  {columnVisibility.name && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Name</th>}
                  {columnVisibility.see && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>See</th>}
                  {columnVisibility.open && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Open</th>}
                  {columnVisibility.create && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Create</th>}
                  {columnVisibility.edit && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Edit</th>}
                  {columnVisibility.delete && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Delete</th>}
                  {columnVisibility.security && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Security</th>}
                  {columnVisibility.admin && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Admin</th>}
                  {columnVisibility.userGroupId && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>UserGroup ID</th>}
                  {columnVisibility.userGroupName && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>UserGroup Name</th>}
                  {columnVisibility.classification && <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #EDF1F5', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Classification</th>}
                  <th className="text-left py-3 px-4" style={{ color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Skeleton loading rows
                  Array.from({ length: Math.min(itemsPerPage, currentData.length || 5) }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="border-b border-gray-100">
                      {columnVisibility.objectId && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="60px" /></td>}
                      {columnVisibility.parentId && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="70px" /></td>}
                      {columnVisibility.name && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="120px" /></td>}
                      {columnVisibility.see && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="40px" /></td>}
                      {columnVisibility.open && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="40px" /></td>}
                      {columnVisibility.create && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="50px" /></td>}
                      {columnVisibility.edit && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="40px" /></td>}
                      {columnVisibility.delete && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="50px" /></td>}
                      {columnVisibility.security && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="60px" /></td>}
                      {columnVisibility.admin && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="50px" /></td>}
                      {columnVisibility.userGroupId && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="60px" /></td>}
                      {columnVisibility.userGroupName && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="100px" /></td>}
                      {columnVisibility.classification && <td className="py-3 px-4" style={{ borderRight: '1px solid #EDF1F5' }}><SkeletonCell width="80px" /></td>}
                      <td className="py-3 px-4"><SkeletonCell width="24px" /></td>
                    </tr>
                  ))
                ) : (
                  // Actual data rows
                  currentData.map((row, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-100 hover:bg-[#E8E8E8] transition-colors"
                    >
                      {columnVisibility.objectId && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.objectId}</td>}
                      {columnVisibility.parentId && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.parentId}</td>}
                      {columnVisibility.name && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.name}</td>}
                      {columnVisibility.see && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.see}</td>}
                      {columnVisibility.open && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.open}</td>}
                      {columnVisibility.create && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.create}</td>}
                      {columnVisibility.edit && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.edit}</td>}
                      {columnVisibility.delete && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.delete}</td>}
                      {columnVisibility.security && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.security}</td>}
                      {columnVisibility.admin && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.admin}</td>}
                      {columnVisibility.userGroupId && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.userGroupId}</td>}
                      {columnVisibility.userGroupName && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>{row.userGroupName}</td>}
                      {columnVisibility.classification && <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #EDF1F5' }}>
                        <Badge variant={getClassificationVariant(row.classification)}>
                          {row.classification}
                        </Badge>
                      </td>}
                      <td className="py-3 px-4 relative">
                        <button
                          onClick={() => setActiveActionMenu(activeActionMenu === index ? null : index)}
                          className="flex items-center justify-center w-6 h-6 hover:bg-gray-100 rounded"
                          style={{
                            color: '#707070'
                          }}
                          aria-label={`Actions menu for ${row.name}`}
                          aria-expanded={activeActionMenu === index}
                          aria-haspopup="true"
                        >
                          <div
                            style={{
                              width: '16px',
                              height: '16px',
                              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'%23707070\'%3e%3ccircle cx=\'8\' cy=\'3\' r=\'1.5\'/%3e%3ccircle cx=\'8\' cy=\'8\' r=\'1.5\'/%3e%3ccircle cx=\'8\' cy=\'13\' r=\'1.5\'/%3e%3c/svg%3e")',
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center',
                              backgroundSize: '16px'
                            }}
                          />
                        </button>
                        
                        {/* Actions Menu Popup */}
                        {activeActionMenu === index && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48" role="menu" aria-labelledby="actions-menu">
                            <div className="py-2">
                              <button
                                onClick={() => {
                                  setActiveActionMenu(null);
                                  // Handle Details action
                                }}
                                className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                <Information32Icon size={16} className="mr-3" style={{ color: '#32373F' }} />
                                Details
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionMenu(null);
                                  // Handle Rename action
                                }}
                                className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                <TextSelection32Icon size={16} className="mr-3" style={{ color: '#32373F' }} />
                                Rename
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionMenu(null);
                                  // Handle Edit privileges action
                                }}
                                className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                <Security32Icon size={16} className="mr-3" style={{ color: '#32373F' }} />
                                Edit privileges
                              </button>
                              <button
                                onClick={() => {
                                  setActiveActionMenu(null);
                                  // Handle Delete action
                                }}
                                className="flex items-center w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                <TrashCan32Icon size={16} className="mr-3" style={{ color: '#32373F' }} />
                                Delete
                              </button>
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
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#EDF1F5' }}>
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border rounded"
                aria-label="Go to previous page"
                style={{ 
                  borderColor: '#d1d1d1',
                  backgroundColor: currentPage === 1 ? '#f5f5f5' : '#ffffff',
                  color: currentPage === 1 ? '#9ca3af' : '#374151',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className="px-3 py-1 text-sm border rounded"
                  style={{
                    borderColor: '#d1d1d1',
                    backgroundColor: currentPage === page ? '#3560C1' : '#ffffff',
                    color: currentPage === page ? '#ffffff' : '#374151'
                  }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border rounded"
                aria-label="Go to next page"
                style={{ 
                  borderColor: '#d1d1d1',
                  backgroundColor: currentPage === totalPages ? '#f5f5f5' : '#ffffff',
                  color: currentPage === totalPages ? '#9ca3af' : '#374151',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Columns Modal */}
      {showColumnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Columns</h3>
              <button
                onClick={() => setShowColumnModal(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close edit columns modal"
              >
                <Close32Icon size={20} />
              </button>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {Object.entries(columnVisibility).map(([key, visible]) => {
                const labels = {
                  objectId: 'Object ID',
                  parentId: 'Parent ID',
                  name: 'Name',
                  see: 'See',
                  open: 'Open',
                  create: 'Create',
                  edit: 'Edit',
                  delete: 'Delete',
                  security: 'Security',
                  admin: 'Admin',
                  userGroupId: 'UserGroup ID',
                  userGroupName: 'UserGroup Name',
                  classification: 'Classification'
                };
                
                return (
                  <label key={key} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visible}
                      onChange={(e) => setColumnVisibility(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{labels[key as keyof typeof labels]}</span>
                  </label>
                );
              })}
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowColumnModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowColumnModal(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default DashboardHomePage; 