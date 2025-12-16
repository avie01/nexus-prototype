import { useState } from 'react';
import { FileExportIcon, ChevronDownIcon, EditIcon } from '../components/icons';

const AdminPage = () => {
  const [accordionStates, setAccordionStates] = useState({
    sharepoint: true,
    s3bucket: false,
    googledrive: false,
    onedrive: false,
    dropbox: false,
    azureblob: false,
    ftp: false,
    box: false,
    salesforce: false
  });

  const [newTemplates, setNewTemplates] = useState<Array<{id: string, name: string, createdDate: string}>>([]);

  const toggleAccordion = (key: string) => {
    setAccordionStates(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const createNewTemplate = () => {
    const now = new Date();
    const formattedDate = `${now.getDate()} Dec ${now.getFullYear()} ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;
    const templateId = `new-template-${Date.now()}`;
    
    const newTemplate = {
      id: templateId,
      name: 'New Export Template',
      createdDate: `Created date ${formattedDate} System Admin`
    };
    
    setNewTemplates(prev => [newTemplate, ...prev]);
    setAccordionStates(prev => ({
      ...prev,
      [templateId]: true
    }));
  };

  return (
    <main>
      <div className="p-4 sm:p-6" style={{ backgroundColor: '#ffffff', borderRadius: '16px 16px 0px 0px' }}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <h1 className="font-semibold flex items-center gap-2" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '20px', fontWeight: '600', lineHeight: '36px' }}>
            <FileExportIcon size={20} aria-hidden="true" />
            Export Settings
          </h1>
        </div>
        <div className="mt-4">
          <button 
            onClick={createNewTemplate}
            className="bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            style={{ color: '#525965', textAlign: 'center', fontFamily: 'Noto Sans', fontSize: '16px', fontStyle: 'normal', fontWeight: '500', lineHeight: '21px', display: 'inline-flex', height: '44px', padding: '10px 14px', justifyContent: 'center', alignItems: 'center', gap: '6px', borderRadius: '2px', border: 'none' }}
          >
            Create new export template
          </button>
        </div>
      </div>
      <div className="p-4" style={{ backgroundColor: '#f5f5f5' }}>
        <p className="text-gray-600" style={{ fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '400', lineHeight: '20px' }}>
          As a system administrator, you can customise the following export settings for all users.
        </p>
      </div>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '0px 0px 16px 16px' }}>
        {/* New Templates */}
        {newTemplates.map((template, index) => (
          <div key={template.id}>
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleAccordion(template.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                style={{ fontFamily: 'Noto Sans' }}
              >
                <div className="flex items-center gap-3">
                  <FileExportIcon 
                    size={24} 
                    className="text-gray-600"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                      {template.name}
                    </span>
                    <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                      {template.createdDate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <EditIcon 
                    size={20} 
                    className="text-gray-500"
                  />
                  <div style={{ width: '8px' }}></div>
                  <ChevronDownIcon 
                    size={20} 
                    className={`text-gray-500 transform transition-transform ${accordionStates[template.id] ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
            </div>
            {accordionStates[template.id] && (
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                        Output connection *
                      </label>
                      <select className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }}>
                        <option value="sharepoint">Sharepoint</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                        Tenant Name
                      </label>
                      <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                        Output Folder Path:
                      </label>
                      <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                        Default site for output. Use 'root' for your the root site
                      </label>
                      <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id={`checkDocuments1-${template.id}`} className="mt-1" />
                      <label htmlFor={`checkDocuments1-${template.id}`} className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                        Check documents for a value to override destinatio...
                      </label>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                        Field to check for site override value
                      </label>
                      <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  
                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                        Default library for output. Use Documents for the default list
                      </label>
                      <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id={`checkDocuments2-${template.id}`} className="mt-1" />
                      <label htmlFor={`checkDocuments2-${template.id}`} className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                        Check documents for a value to override destinati...
                      </label>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                        Field to check for list override value
                      </label>
                      <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id={`createList-${template.id}`} className="mt-1" />
                      <label htmlFor={`createList-${template.id}`} className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                        Create list if it does not...
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id={`failDocuments-${template.id}`} className="mt-1" />
                      <label htmlFor={`failDocuments-${template.id}`} className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                        Fail documents routed to the list if list creation...
                      </label>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                        The number of retry attempts per document before the document fails
                      </label>
                      <input type="number" value="0" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id={`rollBack-${template.id}`} className="mt-1" />
                      <label htmlFor={`rollBack-${template.id}`} className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                        Roll back files that fail to have their metadata or permissions set due to errors or thro...
                      </label>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id={`setACLs-${template.id}`} className="mt-1" />
                      <label htmlFor={`setACLs-${template.id}`} className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                        Set ACLs for documents when avai...
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* SharePoint Template */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion('sharepoint')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  SharePoint export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 25 Dec 2025 9:00 AM Joe Bishop
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.sharepoint ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.sharepoint && (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                Output connection *
              </label>
              <select className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }}>
                <option value="sharepoint">Sharepoint</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                Tenant Name
              </label>
              <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
            </div>
            
            <div>
              <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                Output Folder Path:
              </label>
              <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
            </div>
            
            <div>
              <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                Default site for output. Use 'root' for your the root site
              </label>
              <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
            </div>
            
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="checkDocuments1" className="mt-1" />
              <label htmlFor="checkDocuments1" className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                Check documents for a value to override destinatio...
              </label>
            </div>
            
            <div>
              <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                Field to check for site override value
              </label>
              <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                Default library for output. Use Documents for the default list
              </label>
              <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
            </div>
            
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="checkDocuments2" className="mt-1" />
              <label htmlFor="checkDocuments2" className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                Check documents for a value to override destinati...
              </label>
            </div>
            
            <div>
              <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                Field to check for list override value
              </label>
              <input type="text" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
            </div>
            
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="createList" className="mt-1" />
              <label htmlFor="createList" className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                Create list if it does not...
              </label>
            </div>
            
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="failDocuments" className="mt-1" />
              <label htmlFor="failDocuments" className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                Fail documents routed to the list if list creation...
              </label>
            </div>
            
            <div>
              <label className="block mb-2 font-medium" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                The number of retry attempts per document before the document fails
              </label>
              <input type="number" value="0" className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '24px', borderRadius: '0px', backgroundColor: '#f5f5f5', border: 'none', borderBottom: '1px solid #d1d1d1', height: '44px', boxSizing: 'border-box' }} />
            </div>
            
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="rollBack" className="mt-1" />
              <label htmlFor="rollBack" className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                Roll back files that fail to have their metadata or permissions set due to errors or thro...
              </label>
            </div>
            
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="setACLs" className="mt-1" />
              <label htmlFor="setACLs" className="text-sm" style={{ color: '#32373F', fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '20px' }}>
                Set ACLs for documents when avai...
              </label>
            </div>
          </div>
            </div>
          </div>
        )}

        {/* S3 Bucket Template */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion('s3bucket')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  S3 Bucket export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 22 Dec 2025 2:30 PM Sarah Wilson
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.s3bucket ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.s3bucket && (
          <div className="p-6">
            <p className="text-gray-600">S3 Bucket export settings would go here...</p>
          </div>
        )}

        {/* Google Drive Template */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion('googledrive')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  Google Drive export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 20 Dec 2025 11:15 AM Mike Johnson
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.googledrive ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.googledrive && (
          <div className="p-6">
            <p className="text-gray-600">Google Drive export settings would go here...</p>
          </div>
        )}

        {/* OneDrive Template */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion('onedrive')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  OneDrive export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 18 Dec 2025 3:45 PM Alex Brown
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.onedrive ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.onedrive && (
          <div className="p-6">
            <p className="text-gray-600">OneDrive export settings would go here...</p>
          </div>
        )}

        {/* Dropbox Template */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion('dropbox')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  Dropbox export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 15 Dec 2025 10:20 AM Jane Smith
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.dropbox ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.dropbox && (
          <div className="p-6">
            <p className="text-gray-600">Dropbox export settings would go here...</p>
          </div>
        )}

        {/* Azure Blob Storage Template */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion('azureblob')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  Azure Blob Storage export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 12 Dec 2025 4:10 PM David Chen
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.azureblob ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.azureblob && (
          <div className="p-6">
            <p className="text-gray-600">Azure Blob Storage export settings would go here...</p>
          </div>
        )}

        {/* FTP Server Template */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion('ftp')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  FTP Server export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 10 Dec 2025 1:25 PM Emma Davis
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.ftp ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.ftp && (
          <div className="p-6">
            <p className="text-gray-600">FTP Server export settings would go here...</p>
          </div>
        )}

        {/* Box Template */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => toggleAccordion('box')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  Box export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 8 Dec 2025 9:40 AM Tom Wilson
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.box ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.box && (
          <div className="p-6">
            <p className="text-gray-600">Box export settings would go here...</p>
          </div>
        )}

        {/* Salesforce Template */}
        <div>
          <button
            onClick={() => toggleAccordion('salesforce')}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
            style={{ fontFamily: 'Noto Sans' }}
          >
            <div className="flex items-center gap-3">
              <FileExportIcon 
                size={24} 
                className="text-gray-600"
              />
              <div className="flex flex-col">
                <span className="font-medium" style={{ color: '#32373F', fontSize: '14px', fontWeight: '600', lineHeight: '21px' }}>
                  Salesforce export template
                </span>
                <span className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Noto Sans', fontSize: '14px', lineHeight: '21px' }}>
                  Created date 5 Dec 2025 12:00 PM Lisa Garcia
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <EditIcon 
                size={20} 
                className="text-gray-500"
              />
              <div style={{ width: '8px' }}></div>
              <ChevronDownIcon 
                size={20} 
                className={`text-gray-500 transform transition-transform ${accordionStates.salesforce ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        </div>
        {accordionStates.salesforce && (
          <div className="p-6">
            <p className="text-gray-600">Salesforce export settings would go here...</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminPage;