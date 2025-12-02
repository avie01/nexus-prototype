import { useState } from 'react';
import { GroupSecurityIcon } from '../components/icons';
import CarbonDropdown from '../components/ui/CarbonDropdown';



const DashboardHomePage = () => {
  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Form state
  const [typeValue, setTypeValue] = useState('');
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
    }
  ];

  const handleSearch = () => {
    setShowTable(true);
    setIsLoading(true);
    setCurrentPage(1);
    
    // Simulate loading for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sampleData.slice(startIndex, endIndex);

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
      `}</style>
      <div className="p-6" style={{ backgroundColor: '#ffffff', borderRadius: showTable ? '16px 16px 0px 0px' : '16px' }}>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <GroupSecurityIcon size={20} />
            Privilege reporting
          </h1>
          <p className="text-gray-600">Last privilege update: 14/12/2017 4:56 PM</p>
        </div>
        <div className="grid grid-cols-[25%_1fr_80px] gap-4 mt-4">
          <div>
            <CarbonDropdown
              id="type"
              label="Hierarchy Depth"
              placeholder="Select type..."
              options={[
                { value: 'parent', label: 'Parent' },
                { value: 'ancestor', label: 'Ancestor' }
              ]}
              value={typeValue}
              onChange={setTypeValue}
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
              className="w-full px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ 
                borderBottom: '1px solid #ACACAC', 
                background: '#F5F5F5', 
                border: 'none', 
                height: '44px', 
                borderRadius: '0px',
                color: '#32373F',
                fontFamily: 'Noto Sans',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '24px'
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="block mb-1" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>&nbsp;</div>
            <button
              onClick={handleSearch}
              className="text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                border: 'none'
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
                { value: 'all-objects', label: 'All objects' },
                { value: 'documents', label: 'Documents' },
                { value: 'files', label: 'Files' },
                { value: 'file-or-folders', label: 'File or Folders' },
                { value: 'folders', label: 'Folders' },
                { value: 'physical-documents', label: 'Physical documents' }
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
                  options: [
                    { value: 'john.doe', label: 'John Doe' },
                    { value: 'jane.smith', label: 'Jane Smith' },
                    { value: 'mike.johnson', label: 'Mike Johnson' },
                    { value: 'sarah.wilson', label: 'Sarah Wilson' },
                    { value: 'alex.brown', label: 'Alex Brown' }
                  ]
                },
                {
                  label: 'Groups',
                  options: [
                    { value: 'administrators', label: 'Administrators' },
                    { value: 'finance-team', label: 'Finance Team' },
                    { value: 'hr-department', label: 'HR Department' },
                    { value: 'project-managers', label: 'Project Managers' },
                    { value: 'security-team', label: 'Security Team' }
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
            Results (13)
          </span>
          <button
            className="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              display: 'inline-flex',
              height: '44px',
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
      )}
      {showTable && (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Object ID</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Parent ID</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Name</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>See</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Open</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Create</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Edit</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Delete</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Security</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Admin</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>UserGroup ID</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>UserGroup Name</th>
                  <th className="text-left py-3 px-4" style={{ borderRight: '1px solid #d1d1d1', color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Classification</th>
                  <th className="text-left py-3 px-4" style={{ color: '#707070', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  // Skeleton loading rows
                  Array.from({ length: Math.min(itemsPerPage, currentData.length || 5) }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="border-b border-gray-100">
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="60px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="70px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="120px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="40px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="40px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="50px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="40px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="50px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="60px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="50px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="60px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="100px" />
                      </td>
                      <td className="py-3 px-4" style={{ borderRight: '1px solid #d1d1d1' }}>
                        <SkeletonCell width="80px" />
                      </td>
                      <td className="py-3 px-4">
                        <SkeletonCell width="24px" />
                      </td>
                    </tr>
                  ))
                ) : (
                  // Actual data rows
                  currentData.map((row, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-gray-100 hover:bg-[#E8E8E8] transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.objectId}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.parentId}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.see}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.open}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.create}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.edit}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.delete}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.security}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.admin}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.userGroupId}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.userGroupName}</td>
                      <td className="py-3 px-4 text-sm text-gray-900" style={{ borderRight: '1px solid #d1d1d1' }}>{row.classification}</td>
                      <td className="py-3 px-4">
                        <button
                          className="flex items-center justify-center w-6 h-6 hover:bg-gray-100 rounded"
                          style={{
                            color: '#707070'
                          }}
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
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#d1d1d1' }}>
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(endIndex, sampleData.length)} of {sampleData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border rounded"
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
    </main>
  );
};

export default DashboardHomePage; 