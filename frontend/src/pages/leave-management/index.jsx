import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import { UserRoles } from '../../lib/types';
import { api } from '../../lib/api';
import Header from '../../components/ui/Header';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';
import SLAAlertBanner from '../../components/ui/SLAAlertBanner';
import LeaveApplicationForm from './components/LeaveApplicationForm';
import LeaveRequestsTable from './components/LeaveRequestsTable';
import ApprovalSection from './components/ApprovalSection';
import LeaveBalanceCard from './components/LeaveBalanceCard';
import QuickStatsCards from './components/QuickStatsCards';

const LeaveManagement = () => {
  const { user, hasRole } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [quickStats, setQuickStats] = useState({});

  // Mock data
  const mockLeaveRequests = [
    {
      id: 1,
      employeeName: "John Doe",
      department: "Engineering",
      position: "Senior Developer",
      type: "annual",
      startDate: "2025-01-15",
      endDate: "2025-01-19",
      days: 5,
      reason: "Family vacation to celebrate New Year with extended family members. Planning to visit relatives in different cities.",
      status: "approved",
      approver: "Sarah Johnson",
      submittedDate: "2024-12-20T09:30:00Z",
      attachment: "vacation-itinerary.pdf"
    },
    {
      id: 2,
      employeeName: "John Doe",
      department: "Engineering",
      position: "Senior Developer",
      type: "sick",
      startDate: "2024-12-28",
      endDate: "2024-12-30",
      days: 3,
      reason: "Flu symptoms and doctor recommended rest. Have medical certificate from family physician.",
      status: "pending",
      approver: "Sarah Johnson",
      submittedDate: "2024-12-27T14:15:00Z",
      attachment: null
    },
    {
      id: 3,
      employeeName: "John Doe",
      department: "Engineering",
      position: "Senior Developer",
      type: "personal",
      startDate: "2024-11-22",
      endDate: "2024-11-22",
      days: 1,
      reason: "Personal appointment that cannot be rescheduled during working hours.",
      status: "rejected",
      approver: "Sarah Johnson",
      submittedDate: "2024-11-20T11:45:00Z",
      attachment: null
    }
  ];

  const mockPendingApprovals = [
    {
      id: 4,
      employeeName: "Alice Smith",
      department: "Marketing",
      position: "Marketing Manager",
      type: "annual",
      startDate: "2025-01-20",
      endDate: "2025-01-24",
      days: 5,
      reason: "Planned vacation with family to celebrate wedding anniversary. Booked resort accommodation and flights already.",
      submittedDate: "2024-12-15T10:20:00Z",
      attachment: "booking-confirmation.pdf"
    },
    {
      id: 5,
      employeeName: "Bob Wilson",
      department: "Sales",
      position: "Sales Representative",
      type: "emergency",
      startDate: "2025-01-05",
      endDate: "2025-01-05",
      days: 1,
      reason: "Family emergency requiring immediate attention. Need to travel to hometown urgently.",
      submittedDate: "2024-12-10T16:30:00Z",
      attachment: null
    }
  ];

  const mockLeaveBalances = [
    {
      type: "annual",
      total: 25,
      used: 12,
      remaining: 13,
      pending: 3
    },
    {
      type: "sick",
      total: 10,
      used: 3,
      remaining: 7,
      pending: 0
    },
    {
      type: "personal",
      total: 5,
      used: 2,
      remaining: 3,
      pending: 0
    },
    {
      type: "emergency",
      total: 3,
      used: 0,
      remaining: 3,
      pending: 1
    }
  ];

  const mockQuickStats = {
    totalRequests: 15,
    pendingRequests: 3,
    approvedThisMonth: 8,
    daysTaken: 17
  };

  useEffect(() => {
    // Set mock data for now - in real app this would come from API
    setLeaveRequests(mockLeaveRequests);
    setPendingApprovals(mockPendingApprovals);
    setLeaveBalances(mockLeaveBalances);
    setQuickStats(mockQuickStats);
  }, []);

  const handleSubmitLeaveRequest = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Call the backend API
      const response = await api('/api/leaves/create', {
        method: 'POST',
        body: JSON.stringify({
          user_email: user.email,
          start_date: formData.startDate,
          end_date: formData.endDate,
          leave_type: formData.leaveType,
          reason: formData.reason
        })
      });
      
      const newRequest = {
        id: response.leave_id,
        employeeName: user.name,
        department: "Engineering",
        position: "Senior Developer",
        type: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days: Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24)) + 1,
        reason: formData.reason,
        status: "pending",
        approver: "Sarah Johnson",
        submittedDate: new Date().toISOString(),
        attachment: formData.attachment?.name || null
      };
      
      setLeaveRequests(prev => [newRequest, ...prev]);
      
      // Show success notification
      alert('Leave request submitted successfully!');
      
    } catch (error) {
      alert(`Failed to submit leave request: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveRequest = async (requestId, comment) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPendingApprovals(prev => prev?.filter(req => req?.id !== requestId));
      alert('Leave request approved successfully!');
      
    } catch (error) {
      alert('Failed to approve request. Please try again.');
    }
  };

  const handleRejectRequest = async (requestId, comment) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPendingApprovals(prev => prev?.filter(req => req?.id !== requestId));
      alert('Leave request rejected.');
      
    } catch (error) {
      alert('Failed to reject request. Please try again.');
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Submitted Date', 'Type', 'Start Date', 'End Date', 'Days', 'Status', 'Approver', 'Reason'],
      ...leaveRequests?.map(req => [
        new Date(req.submittedDate)?.toLocaleDateString(),
        req?.type,
        req?.startDate,
        req?.endDate,
        req?.days,
        req?.status,
        req?.approver,
        req?.reason?.replace(/,/g, ';')
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leave-requests-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Leave Management - Enterprise HRMS</title>
        <meta name="description" content="Submit, track, and manage leave requests with intelligent SLA monitoring and approval workflows." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <Header />
        <SLAAlertBanner />
        
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Leave Management</h1>
              <p className="text-slate-600">
                Submit new requests, track status, and manage your time off efficiently
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mb-8">
              <QuickStatsCards stats={quickStats} />
            </div>

            {/* Leave Balance */}
            <div className="mb-8">
              <LeaveBalanceCard balances={leaveBalances} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Left Column - Forms and Tables */}
              <div className="xl:col-span-2 space-y-8">
                {/* Leave Application Form */}
                <LeaveApplicationForm 
                  onSubmit={handleSubmitLeaveRequest}
                  isSubmitting={isSubmitting}
                />

                {/* Leave Requests Table */}
                <LeaveRequestsTable 
                  requests={leaveRequests}
                  onExport={handleExportCSV}
                  userRole={user?.role}
                />
              </div>

              {/* Right Column - Approvals (for Managers/HR) */}
              <div className="xl:col-span-1">
                {hasRole(UserRoles.HR_MANAGER) && (
                  <div className="sticky top-24">
                    <ApprovalSection 
                      pendingRequests={pendingApprovals}
                      onApprove={handleApproveRequest}
                      onReject={handleRejectRequest}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <FloatingChatWidget />
      </div>
    </>
  );
};

export default LeaveManagement;