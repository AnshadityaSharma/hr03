import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApprovalSection = ({ pendingRequests, onApprove, onReject }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [comment, setComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async (requestId) => {
    setIsProcessing(true);
    try {
      await onApprove(requestId, comment);
      setSelectedRequest(null);
      setComment('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (requestId) => {
    setIsProcessing(true);
    try {
      await onReject(requestId, comment);
      setSelectedRequest(null);
      setComment('');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDaysOverdue = (submittedDate) => {
    const submitted = new Date(submittedDate);
    const slaDeadline = new Date(submitted.getTime() + (3 * 24 * 60 * 60 * 1000));
    const now = new Date();
    const diffTime = now - slaDeadline;
    const daysOverdue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return daysOverdue > 0 ? daysOverdue : 0;
  };

  if (pendingRequests?.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-elevation-2 p-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4">
            <Icon name="CheckCircle" size={24} color="var(--color-success)" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">All caught up!</h3>
          <p className="text-slate-600">No pending leave requests require your approval.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-elevation-2">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-xl">
            <Icon name="Clock" size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Pending Approvals</h2>
            <p className="text-sm text-slate-600">{pendingRequests?.length} requests awaiting your decision</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-slate-200">
        {pendingRequests?.map((request) => {
          const daysOverdue = calculateDaysOverdue(request?.submittedDate);
          const isOverdue = daysOverdue > 0;
          
          return (
            <div key={request?.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-slate-700">
                        {request?.employeeName?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-900">{request?.employeeName}</h3>
                      <p className="text-sm text-slate-600">{request?.department} • {request?.position}</p>
                    </div>
                    {isOverdue && (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        <Icon name="AlertTriangle" size={12} />
                        <span>{daysOverdue} days overdue</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Leave Type</label>
                      <p className="text-sm font-medium text-slate-900 capitalize">
                        {request?.type?.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Duration</label>
                      <p className="text-sm font-medium text-slate-900">
                        {formatDate(request?.startDate)} - {formatDate(request?.endDate)}
                      </p>
                      <p className="text-xs text-slate-600">{request?.days} days</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Submitted</label>
                      <p className="text-sm font-medium text-slate-900">
                        {formatDate(request?.submittedDate)}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Reason</label>
                    <p className="text-sm text-slate-900 mt-1">{request?.reason}</p>
                  </div>

                  {request?.attachment && (
                    <div className="mb-4">
                      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Attachment</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <Icon name="Paperclip" size={16} color="var(--color-slate-600)" />
                        <a href="#" className="text-sm text-primary hover:underline">
                          {request?.attachment}
                        </a>
                      </div>
                    </div>
                  )}

                  {selectedRequest === request?.id && (
                    <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Add Comment (Optional)
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e?.target?.value)}
                        placeholder="Provide feedback or additional notes..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col space-y-2 ml-6">
                  {selectedRequest === request?.id ? (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        loading={isProcessing}
                        onClick={() => handleApprove(request?.id)}
                        iconName="Check"
                        iconPosition="left"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        loading={isProcessing}
                        onClick={() => handleReject(request?.id)}
                        iconName="X"
                        iconPosition="left"
                      >
                        Reject
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(null);
                          setComment('');
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(request?.id)}
                        iconName="MessageSquare"
                        iconPosition="left"
                      >
                        Review
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        iconPosition="left"
                      >
                        Details
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApprovalSection;