import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const TaskFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  categories, 
  assignees 
}) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...categories?.map(cat => ({ value: cat, label: cat }))
  ];

  const assigneeOptions = [
    { value: 'all', label: 'All Assignees' },
    ...assignees?.map(assignee => ({ value: assignee, label: assignee }))
  ];

  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'title', label: 'Task Name' },
    { value: 'category', label: 'Category' }
  ];

  const hasActiveFilters = () => {
    return filters?.status !== 'all' || 
           filters?.priority !== 'all' || 
           filters?.category !== 'all' || 
           filters?.assignee !== 'all' || 
           filters?.search !== '';
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Filters & Search</span>
        </h3>
        {hasActiveFilters() && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search tasks by title or description..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filter Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
          />

          <Select
            label="Priority"
            options={priorityOptions}
            value={filters?.priority}
            onChange={(value) => onFilterChange('priority', value)}
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => onFilterChange('category', value)}
          />

          <Select
            label="Assignee"
            options={assigneeOptions}
            value={filters?.assignee}
            onChange={(value) => onFilterChange('assignee', value)}
          />
        </div>

        {/* Sort and View Options */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-4">
            <Select
              label="Sort by"
              options={sortOptions}
              value={filters?.sortBy}
              onChange={(value) => onFilterChange('sortBy', value)}
              className="w-40"
            />

            <Button
              variant="outline"
              size="sm"
              onClick={() => onFilterChange('sortOrder', filters?.sortOrder === 'asc' ? 'desc' : 'asc')}
              iconName={filters?.sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
              iconPosition="left"
              iconSize={14}
            >
              {filters?.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">View:</span>
            <Button
              variant={filters?.viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('viewMode', 'list')}
              iconName="List"
              iconSize={16}
            />
            <Button
              variant={filters?.viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onFilterChange('viewMode', 'grid')}
              iconName="Grid3X3"
              iconSize={16}
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
            <span className="text-sm text-slate-600">Active filters:</span>
            
            {filters?.search && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Search: "{filters?.search}"
                <button
                  onClick={() => onFilterChange('search', '')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200"
                >
                  <Icon name="X" size={10} />
                </button>
              </span>
            )}

            {filters?.status !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Status: {filters?.status}
                <button
                  onClick={() => onFilterChange('status', 'all')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200"
                >
                  <Icon name="X" size={10} />
                </button>
              </span>
            )}

            {filters?.priority !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Priority: {filters?.priority}
                <button
                  onClick={() => onFilterChange('priority', 'all')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-amber-200"
                >
                  <Icon name="X" size={10} />
                </button>
              </span>
            )}

            {filters?.category !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Category: {filters?.category}
                <button
                  onClick={() => onFilterChange('category', 'all')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200"
                >
                  <Icon name="X" size={10} />
                </button>
              </span>
            )}

            {filters?.assignee !== 'all' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                Assignee: {filters?.assignee}
                <button
                  onClick={() => onFilterChange('assignee', 'all')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-indigo-200"
                >
                  <Icon name="X" size={10} />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskFilters;