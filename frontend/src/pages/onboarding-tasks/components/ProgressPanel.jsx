import React from 'react';
import Icon from '../../../components/AppIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, Bar, Tooltip } from 'recharts';

const ProgressPanel = ({ tasks, userRole }) => {
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter(task => task?.status === 'completed')?.length;
  const inProgressTasks = tasks?.filter(task => task?.status === 'in_progress')?.length;
  const overdueTasks = tasks?.filter(task => {
    return new Date(task.dueDate) < new Date() && task?.status !== 'completed';
  })?.length;
  const upcomingDeadlines = tasks?.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));
    return dueDate <= threeDaysFromNow && dueDate >= today && task?.status !== 'completed';
  })?.length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const pieData = [
    { name: 'Completed', value: completedTasks, color: '#059669' },
    { name: 'In Progress', value: inProgressTasks, color: '#0ea5e9' },
    { name: 'Pending', value: totalTasks - completedTasks - inProgressTasks, color: '#64748b' },
  ];

  const categoryProgress = tasks?.reduce((acc, task) => {
    const category = task?.category;
    if (!acc?.[category]) {
      acc[category] = { total: 0, completed: 0 };
    }
    acc[category].total++;
    if (task?.status === 'completed') {
      acc[category].completed++;
    }
    return acc;
  }, {});

  const categoryData = Object.entries(categoryProgress)?.map(([category, data]) => ({
    category,
    completed: data?.completed,
    total: data?.total,
    percentage: Math.round((data?.completed / data?.total) * 100)
  }));

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: 'CheckSquare',
      color: 'text-slate-600',
      bgColor: 'bg-slate-100'
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: 'CheckCircle',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: 'Clock',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Overdue',
      value: overdueTasks,
      icon: 'AlertTriangle',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Overall Progress</h2>
          <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="text-sm text-slate-600">
          {completedTasks} of {totalTasks} tasks completed
        </div>
      </div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat?.value}</p>
                <p className="text-sm text-slate-600">{stat?.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Progress by Category */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Progress by Category</h3>
        <div className="space-y-4">
          {categoryData?.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">{category?.category}</span>
                <span className="text-sm text-slate-500">
                  {category?.completed}/{category?.total} ({category?.percentage}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${category?.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Completion Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Task Distribution</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-6 mt-4">
          {pieData?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-slate-600">{entry?.name}: {entry?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Alerts */}
      {(overdueTasks > 0 || upcomingDeadlines > 0) && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className="text-amber-500" />
            <span>Attention Required</span>
          </h3>
          <div className="space-y-3">
            {overdueTasks > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <Icon name="AlertCircle" size={16} className="text-red-600" />
                <span className="text-sm text-red-800">
                  {overdueTasks} task{overdueTasks > 1 ? 's' : ''} overdue
                </span>
              </div>
            )}
            {upcomingDeadlines > 0 && (
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <Icon name="Clock" size={16} className="text-amber-600" />
                <span className="text-sm text-amber-800">
                  {upcomingDeadlines} task{upcomingDeadlines > 1 ? 's' : ''} due within 3 days
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressPanel;