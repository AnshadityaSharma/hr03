import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LeaveRequestsTable = ({ requests, onExport, userRole }) => {
  const [sortField, setSortField] = useState('submittedDate');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'annual', label: 'Annual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'paternity', label: 'Paternity Leave' },
    { value: 'emergency', label: 'Emergency Leave' },
    { value: 'bereavement', label: 'Bereavement Leave' },
    { value: 'unpaid', label: 'Unpaid Leave' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      rejected: 'bg-red-100 text-red-800 border-red-200',
      cancelled: 'bg-slate-100 text-slate-800 border-slate-200'
    };
    
    const icons = {
      pending: 'Clock',
      approved: 'CheckCircle',
      rejected: 'XCircle',
      cancelled: 'Ban'
    };

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${badges?.[status]}`}>
        <Icon name={icons?.[status]} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const getUrgencyIndicator = (daysRemaining) => {
    if (daysRemaining < 0) {
      return <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" title="Overdue" />;
    } else if (daysRemaining <= 1) {
      return <span className="w-2 h-2 bg-amber-500 rounded-full" title="Due soon" />;
    }
    return <span className="w-2 h-2 bg-emerald-500 rounded-full" title="On track" />;
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedRequests = requests?.filter(request => {
      const matchesStatus = !filterStatus || request?.status === filterStatus;
      const matchesType = !filterType || request?.type === filterType;
      const matchesSearch = !searchTerm || 
        request?.reason?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        request?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      return matchesStatus && matchesType && matchesSearch;
    })?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (sortField === 'submittedDate' || sortField === 'startDate' || sortField === 'endDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDaysRemaining = (submittedDate) => {
    const submitted = new Date(submittedDate);
    const slaDeadline = new Date(submitted.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days SLA
    const now = new Date();
    const diffTime = slaDeadline - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl">
              <Icon name="FileText" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Leave Requests</h2>
              <p className="text-sm text-slate-600">{filteredAndSortedRequests?.length} total requests</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            size="sm"
          >
            Export CSV
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="md:col-span-2"
          />
          
          <Select
            placeholder="Filter by status"
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
          />
          
          <Select
            placeholder="Filter by type"
            options={typeOptions}
            value={filterType}
            onChange={setFilterType}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('submittedDate')}
                  className="flex items-center space-x-1 hover:text-slate-700"
                >
                  <span>Submitted</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 hover:text-slate-700"
                >
                  <span>Type</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('startDate')}
                  className="flex items-center space-x-1 hover:text-slate-700"
                >
                  <span>Dates</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Days
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-slate-700"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Approver
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                SLA
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredAndSortedRequests?.map((request) => (
              <tr key={request?.id} className="hover:bg-slate-50 transition-spring">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">
                    {formatDate(request?.submittedDate)}
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(request.submittedDate)?.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900 capitalize">
                    {request?.type?.replace('_', ' ')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">
                    {formatDate(request?.startDate)} - {formatDate(request?.endDate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">
                    {request?.days}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(request?.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{request?.approver}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getUrgencyIndicator(calculateDaysRemaining(request?.submittedDate))}
                    <span className="text-xs text-slate-500">
                      {calculateDaysRemaining(request?.submittedDate) >= 0 
                        ? `${calculateDaysRemaining(request?.submittedDate)}d left`
                        : `${Math.abs(calculateDaysRemaining(request?.submittedDate))}d overdue`
                      }
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      iconSize={16}
                      className="h-8 w-8"
                    />
                    {request?.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="X"
                        iconSize={16}
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredAndSortedRequests?.length === 0 && (
        <div className="text-center py-12">
          <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mx-auto mb-4">
            <Icon name="FileText" size={24} color="var(--color-slate-400)" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No requests found</h3>
          <p className="text-slate-600">
            {searchTerm || filterStatus || filterType 
              ? 'Try adjusting your filters to see more results.' :'Submit your first leave request using the form above.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestsTable;