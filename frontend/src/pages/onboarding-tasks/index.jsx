import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserRoles } from '../../lib/types';
import { api } from '../../lib/api';
import Header from '../../components/ui/Header';
import FloatingChatWidget from '../../components/ui/FloatingChatWidget';
import SLAAlertBanner from '../../components/ui/SLAAlertBanner';
import TaskCard from './components/TaskCard';
import ProgressPanel from './components/ProgressPanel';
import TaskFilters from './components/TaskFilters';
import TaskDetailsModal from './components/TaskDetailsModal';
import BulkActionsPanel from './components/BulkActionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const OnboardingTasks = () => {
  const { user, hasRole } = useAuth();
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    category: 'all',
    assignee: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc',
    viewMode: 'list'
  });

  // Mock tasks data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Employee Handbook Review",
      description: "Read through the complete employee handbook and acknowledge understanding of company policies and procedures.",
      status: "pending",
      priority: "high",
      category: "Documentation",
      assignedTo: "John Doe",
      dueDate: "2025-01-10T17:00:00Z",
      estimatedTime: "2 hours",
      requiresHRApproval: true,
      requiresDigitalSignature: true,
      requirements: [
        "Read all sections of the employee handbook",
        "Complete the acknowledgment form",
        "Submit any questions to HR"
      ],
      resources: [
        { title: "Employee Handbook PDF", url: "#handbook" },
        { title: "Acknowledgment Form", url: "#form" }
      ],
      instructions: `Please read through the entire employee handbook carefully. Pay special attention to the code of conduct, benefits information, and company policies. Once completed, fill out the acknowledgment form and submit it to HR.`
    },
    {
      id: 2,
      title: "IT Security Training",
      description: "Complete mandatory cybersecurity awareness training and pass the assessment with 80% or higher.",
      status: "in_progress",
      priority: "high",
      category: "Training",
      assignedTo: "John Doe",
      dueDate: "2025-01-08T17:00:00Z",
      estimatedTime: "1.5 hours",
      requiresHRApproval: false,
      requiresDigitalSignature: false,
      requirements: [
        "Complete all training modules",
        "Pass the final assessment with 80% score",
        "Download security certificate"
      ],
      resources: [
        { title: "Security Training Portal", url: "#training" },
        { title: "Security Guidelines", url: "#guidelines" }
      ],
      instructions: `Access the security training portal using your employee credentials. Complete all modules in sequence and take the final assessment. You must achieve at least 80% to pass.`
    },
    {
      id: 3,
      title: "Workspace Setup",
      description: "Set up your assigned workspace including desk arrangement, equipment testing, and ergonomic adjustments.",
      status: "completed",
      priority: "medium",
      category: "Equipment Setup",
      assignedTo: "John Doe",
      dueDate: "2025-01-05T17:00:00Z",
      estimatedTime: "1 hour",
      requiresHRApproval: false,
      requiresDigitalSignature: false,
      completedAt: "2025-01-04T14:30:00Z",
      requirements: [
        "Arrange desk and chair for comfort",
        "Test all provided equipment",
        "Adjust monitor height and lighting"
      ],
      resources: [
        { title: "Ergonomic Guidelines", url: "#ergonomics" },
        { title: "Equipment Manual", url: "#manual" }
      ],
      instructions: `Set up your workspace according to ergonomic best practices. Test all equipment and report any issues to IT support immediately.`
    },
    {
      id: 4,
      title: "Benefits Enrollment",
      description: "Review and select your employee benefits including health insurance, retirement plans, and other optional benefits.",
      status: "pending",
      priority: "high",
      category: "Benefits",
      assignedTo: "John Doe",
      dueDate: "2025-01-15T17:00:00Z",
      estimatedTime: "45 minutes",
      requiresHRApproval: true,
      requiresDigitalSignature: true,
      requirements: [
        "Review all available benefit options",
        "Make selections in the benefits portal",
        "Submit enrollment forms"
      ],
      resources: [
        { title: "Benefits Portal", url: "#benefits" },
        { title: "Benefits Guide", url: "#guide" },
        { title: "Plan Comparison Chart", url: "#comparison" }
      ],
      instructions: `Log into the benefits portal and review all available options. Consider your personal needs and budget when making selections. Submit your choices before the deadline.`
    },
    {
      id: 5,
      title: "Department Introduction Meeting",
      description: "Attend scheduled meeting with your department team to learn about ongoing projects and team dynamics.",
      status: "pending",
      priority: "medium",
      category: "Meetings",
      assignedTo: "John Doe",
      dueDate: "2025-01-07T10:00:00Z",
      estimatedTime: "1 hour",
      requiresHRApproval: false,
      requiresDigitalSignature: false,
      requirements: [
        "Attend the scheduled meeting",
        "Introduce yourself to team members",
        "Take notes on current projects"
      ],
      resources: [
        { title: "Team Directory", url: "#directory" },
        { title: "Current Projects Overview", url: "#projects" }
      ],
      instructions: `Join the department meeting at the scheduled time. Come prepared with questions about the team and current projects. This is a great opportunity to get to know your colleagues.`
    },
    {
      id: 6,
      title: "System Access Setup",
      description: "Complete setup for all required business systems and applications with proper authentication.",
      status: "in_progress",
      priority: "high",
      category: "System Access",
      assignedTo: "John Doe",
      dueDate: "2025-01-06T17:00:00Z",
      estimatedTime: "30 minutes",
      requiresHRApproval: false,
      requiresDigitalSignature: false,
      requirements: [
        "Set up multi-factor authentication",
        "Test access to all required systems",
        "Update password according to policy"
      ],
      resources: [
        { title: "System Access Guide", url: "#access" },
        { title: "Password Policy", url: "#password" }
      ],
      instructions: `Follow the system access guide to set up your accounts. Enable multi-factor authentication for all systems and ensure your passwords meet company requirements.`
    }
  ]);

  useEffect(() => {
    // Load tasks from API
    const loadTasks = async () => {
      try {
        const response = await api(`/api/onboarding/tasks?email=${encodeURIComponent(user.email)}`);
        if (response.ok && response.tasks) {
          // Transform API response to match our UI format
          const transformedTasks = response.tasks.map(task => ({
            id: task.id,
            title: task.task_name,
            description: `Complete task: ${task.task_name}`,
            status: task.completed ? 'completed' : 'pending',
            priority: 'medium',
            category: 'Onboarding',
            assignedTo: user.name,
            dueDate: task.due_date,
            estimatedTime: '1 hour',
            requiresHRApproval: false,
            requiresDigitalSignature: false,
            completedAt: task.completed ? task.due_date : null,
            requirements: [
              `Complete ${task.task_name}`,
              'Submit for review if required'
            ],
            resources: [],
            instructions: `Please complete the task: ${task.task_name}`
          }));
          setTasks(transformedTasks);
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
        // Keep using mock data as fallback
      }
    };

    if (user?.email) {
      loadTasks();
    }
  }, [user]);

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks?.filter(task => {
      const matchesSearch = task?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                           task?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      const matchesStatus = filters?.status === 'all' || 
                           (filters?.status === 'overdue' ? 
                            (new Date(task.dueDate) < new Date() && task?.status !== 'completed') :
                            task?.status === filters?.status);
      const matchesPriority = filters?.priority === 'all' || task?.priority === filters?.priority;
      const matchesCategory = filters?.category === 'all' || task?.category === filters?.category;
      const matchesAssignee = filters?.assignee === 'all' || task?.assignedTo === filters?.assignee;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssignee;
    });

    // Sort tasks
    filtered?.sort((a, b) => {
      let aValue, bValue;
      
      switch (filters?.sortBy) {
        case 'dueDate':
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder?.[a?.priority];
          bValue = priorityOrder?.[b?.priority];
          break;
        case 'status':
          const statusOrder = { pending: 1, in_progress: 2, completed: 3 };
          aValue = statusOrder?.[a?.status];
          bValue = statusOrder?.[b?.status];
          break;
        case 'title':
          aValue = a?.title?.toLowerCase();
          bValue = b?.title?.toLowerCase();
          break;
        case 'category':
          aValue = a?.category?.toLowerCase();
          bValue = b?.category?.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return filters?.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return filters?.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [tasks, filters]);

  // Get unique values for filter options
  const categories = [...new Set(tasks.map(task => task.category))];
  const assignees = [...new Set(tasks.map(task => task.assignedTo))];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      priority: 'all',
      category: 'all',
      assignee: 'all',
      sortBy: 'dueDate',
      sortOrder: 'asc',
      viewMode: 'list'
    });
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      if (completed) {
        await api('/api/onboarding/complete', {
          method: 'POST',
          body: JSON.stringify({ task_id: taskId })
        });
      }
      
      setTasks(prev => prev?.map(task => 
        task?.id === taskId 
          ? { 
              ...task, 
              status: completed ? 'completed' : 'pending',
              completedAt: completed ? new Date()?.toISOString() : null
            }
          : task
      ));
    } catch (error) {
      console.error('Failed to update task:', error);
      alert(`Failed to update task: ${error.message}`);
    }
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(prev => prev?.map(task => 
      task?.id === updatedTask?.id ? updatedTask : task
    ));
  };

  const handleTaskSelection = (taskId, selected) => {
    if (selected) {
      setSelectedTasks(prev => [...prev, taskId]);
    } else {
      setSelectedTasks(prev => prev?.filter(id => id !== taskId));
    }
  };

  const handleSelectAll = () => {
    setSelectedTasks(filteredTasks?.map(task => task?.id));
  };

  const handleDeselectAll = () => {
    setSelectedTasks([]);
  };

  const handleBulkAction = (action, taskIds) => {
    switch (action) {
      case 'mark_complete':
        setTasks(prev => prev?.map(task => 
          taskIds?.includes(task?.id) 
            ? { ...task, status: 'completed', completedAt: new Date()?.toISOString() }
            : task
        ));
        break;
      case 'mark_in_progress':
        setTasks(prev => prev?.map(task => 
          taskIds?.includes(task?.id) 
            ? { ...task, status: 'in_progress' }
            : task
        ));
        break;
      case 'export':
        console.log('Exporting tasks:', taskIds);
        break;
      default:
        console.log('Bulk action:', action, taskIds);
    }
    setSelectedTasks([]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <SLAAlertBanner />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
                  <Icon name="CheckSquare" size={32} className="text-primary" />
                  <span>Onboarding Tasks</span>
                </h1>
                <p className="text-slate-600 mt-2">
                  Track and complete your onboarding tasks to get started with the company
                </p>
              </div>
              
              {hasRole(UserRoles.HR_MANAGER) && (
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Add Task
                  </Button>
                  <Button
                    variant="default"
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    onClick={() => alert('Manage Templates clicked!')}
                  >
                    Manage Templates
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <TaskFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                categories={categories}
                assignees={assignees}
              />

              {/* Bulk Actions */}
              {selectedTasks?.length > 0 && (
                <BulkActionsPanel
                  selectedTasks={selectedTasks}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleDeselectAll}
                  onBulkAction={handleBulkAction}
                  totalTasks={filteredTasks?.length}
                  userRole={userRole}
                />
              )}

              {/* Tasks List */}
              <div className="space-y-4">
                {filteredTasks?.length === 0 ? (
                  <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                    <Icon name="CheckSquare" size={48} className="text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No tasks found</h3>
                    <p className="text-slate-600">
                      {filters?.search || filters?.status !== 'all' || filters?.priority !== 'all' || filters?.category !== 'all' ?'Try adjusting your filters to see more tasks.' :'All onboarding tasks have been completed!'}
                    </p>
                  </div>
                ) : (
                  filteredTasks?.map(task => (
                    <div key={task?.id} className="relative">
                      <div className="absolute left-4 top-6 z-10">
                        <input
                          type="checkbox"
                          checked={selectedTasks?.includes(task?.id)}
                          onChange={(e) => handleTaskSelection(task?.id, e?.target?.checked)}
                          className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                        />
                      </div>
                      <div className="pl-10">
                        <TaskCard
                          task={task}
                          onToggleComplete={handleToggleComplete}
                          onViewDetails={handleViewDetails}
                          userRole={user?.role}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <ProgressPanel tasks={tasks} userRole={user?.role} />
              {/* Dock Demo: Add Dock to sidebar for visibility */}
              <div className="mt-6">
                {/* Example Dock usage, replace icons with your own if needed */}
                <Dock
                  items={[
                    { icon: <Icon name="Home" size={18} />, label: 'Home', onClick: () => alert('Home!') },
                    { icon: <Icon name="Archive" size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
                    { icon: <Icon name="User" size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
                    { icon: <Icon name="Settings" size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
                  ]}
                  panelHeight={68}
                  baseItemSize={50}
                  magnification={70}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Task Details Modal */}
      <TaskDetailsModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        userRole={user?.role}
      />
      <FloatingChatWidget />
    </div>
  );
};

export default OnboardingTasks;