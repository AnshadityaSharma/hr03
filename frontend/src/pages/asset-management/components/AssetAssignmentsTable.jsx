import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetAssignmentsTable = () => {
  const [sortField, setSortField] = useState('assignedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assignmentsData = [
    {
      id: 1,
      assetId: 'AST-001',
      itemName: 'MacBook Pro 16"',
      category: 'Laptop',
      assignedDate: new Date('2024-01-15'),
      returnDate: new Date('2025-01-15'),
      condition: 'excellent',
      status: 'active',
      location: 'Office - Desk 42',
      serialNumber: 'MBP16-2024-001',
      assignedBy: 'IT Admin'
    },
    {
      id: 2,
      assetId: 'AST-002',
      itemName: 'Dell UltraSharp 27"',
      category: 'Monitor',
      assignedDate: new Date('2024-02-01'),
      returnDate: new Date('2025-02-01'),
      condition: 'good',
      status: 'active',
      location: 'Office - Desk 42',
      serialNumber: 'DU27-2024-002',
      assignedBy: 'IT Admin'
    },
    {
      id: 3,
      assetId: 'AST-003',
      itemName: 'iPhone 14 Pro',
      category: 'Mobile',
      assignedDate: new Date('2023-12-10'),
      returnDate: new Date('2024-12-10'),
      condition: 'fair',
      status: 'return_requested',
      location: 'Remote Work',
      serialNumber: 'IP14-2023-003',
      assignedBy: 'HR Manager'
    },
    {
      id: 4,
      assetId: 'AST-004',
      itemName: 'Herman Miller Chair',
      category: 'Furniture',
      assignedDate: new Date('2024-03-01'),
      returnDate: null,
      condition: 'excellent',
      status: 'active',
      location: 'Office - Desk 42',
      serialNumber: 'HM-2024-004',
      assignedBy: 'Facilities'
    },
    {
      id: 5,
      assetId: 'AST-005',
      itemName: 'Logitech MX Master 3',
      category: 'Accessories',
      assignedDate: new Date('2024-01-20'),
      returnDate: new Date('2024-09-15'),
      condition: 'good',
      status: 'returned',
      location: 'Returned',
      serialNumber: 'LMX-2024-005',
      assignedBy: 'IT Admin'
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'return_requested', label: 'Return Requested' },
    { value: 'returned', label: 'Returned' },
    { value: 'maintenance', label: 'Under Maintenance' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Active', color: 'bg-green-100 text-green-800' },
      return_requested: { label: 'Return Requested', color: 'bg-amber-100 text-amber-800' },
      returned: { label: 'Returned', color: 'bg-slate-100 text-slate-800' },
      maintenance: { label: 'Maintenance', color: 'bg-blue-100 text-blue-800' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getConditionBadge = (condition) => {
    const conditionConfig = {
      excellent: { label: 'Excellent', color: 'bg-green-100 text-green-800' },
      good: { label: 'Good', color: 'bg-blue-100 text-blue-800' },
      fair: { label: 'Fair', color: 'bg-amber-100 text-amber-800' },
      poor: { label: 'Poor', color: 'bg-red-100 text-red-800' }
    };
    
    const config = conditionConfig?.[condition] || conditionConfig?.good;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = assignmentsData?.filter(item => {
      const matchesStatus = filterStatus === 'all' || item?.status === filterStatus;
      const matchesSearch = item?.itemName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           item?.assetId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           item?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      return matchesStatus && matchesSearch;
    })?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (aValue instanceof Date) {
        aValue = aValue?.getTime();
        bValue = bValue?.getTime() || 0;
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue?.toLowerCase();
        bValue = bValue?.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleReturnRequest = (assetId) => {
    console.log('Return request for asset:', assetId);
    // In real app, this would make an API call
  };

  const handleReportIssue = (assetId) => {
    console.log('Report issue for asset:', assetId);
    // In real app, this would open a modal or navigate to issue reporting
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl">
            <Icon name="Clipboard" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">My Asset Assignments</h2>
            <p className="text-sm text-slate-600">Track your assigned equipment and resources</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e?.target?.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-64"
            />
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('assetId')}
                  className="flex items-center space-x-1 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  <span>Asset ID</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('itemName')}
                  className="flex items-center space-x-1 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  <span>Item</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('assignedDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  <span>Assigned Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left py-3 px-4">Return Date</th>
              <th className="text-left py-3 px-4">Condition</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData?.map((assignment) => (
              <tr key={assignment?.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-4 px-4">
                  <div className="font-medium text-slate-900">{assignment?.assetId}</div>
                  <div className="text-xs text-slate-500">{assignment?.serialNumber}</div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-medium text-slate-900">{assignment?.itemName}</div>
                  <div className="text-sm text-slate-600">{assignment?.category}</div>
                </td>
                <td className="py-4 px-4 text-sm text-slate-600">
                  {formatDate(assignment?.assignedDate)}
                </td>
                <td className="py-4 px-4 text-sm text-slate-600">
                  {formatDate(assignment?.returnDate)}
                </td>
                <td className="py-4 px-4">
                  {getConditionBadge(assignment?.condition)}
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(assignment?.status)}
                </td>
                <td className="py-4 px-4 text-sm text-slate-600">
                  {assignment?.location}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-end space-x-2">
                    {assignment?.status === 'active' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReturnRequest(assignment?.assetId)}
                          iconName="RotateCcw"
                          iconSize={14}
                        >
                          Return
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReportIssue(assignment?.assetId)}
                          iconName="AlertTriangle"
                          iconSize={14}
                        >
                          Issue
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {filteredAndSortedData?.map((assignment) => (
          <div key={assignment?.id} className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-slate-900">{assignment?.itemName}</h3>
                <p className="text-sm text-slate-600">{assignment?.assetId}</p>
              </div>
              {getStatusBadge(assignment?.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm mb-4">
              <div>
                <span className="text-slate-500">Assigned:</span>
                <p className="font-medium">{formatDate(assignment?.assignedDate)}</p>
              </div>
              <div>
                <span className="text-slate-500">Return:</span>
                <p className="font-medium">{formatDate(assignment?.returnDate)}</p>
              </div>
              <div>
                <span className="text-slate-500">Condition:</span>
                <div className="mt-1">{getConditionBadge(assignment?.condition)}</div>
              </div>
              <div>
                <span className="text-slate-500">Location:</span>
                <p className="font-medium">{assignment?.location}</p>
              </div>
            </div>
            
            {assignment?.status === 'active' && (
              <div className="flex items-center space-x-2 pt-3 border-t border-slate-200">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleReturnRequest(assignment?.assetId)}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Request Return
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  fullWidth
                  onClick={() => handleReportIssue(assignment?.assetId)}
                  iconName="AlertTriangle"
                  iconPosition="left"
                >
                  Report Issue
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredAndSortedData?.length === 0 && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4">
            <Icon name="Clipboard" size={24} color="var(--color-muted-foreground)" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No assignments found</h3>
          <p className="text-slate-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default AssetAssignmentsTable;