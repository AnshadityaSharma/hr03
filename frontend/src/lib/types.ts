// User Roles Enum
export enum UserRoles {
  EMPLOYEE = 'Employee',
  HR_MANAGER = 'HR Manager',
  ADMIN = 'Admin'
}

// Leave Types
export enum LeaveTypes {
  ANNUAL = 'annual',
  SICK = 'sick',
  PERSONAL = 'personal',
  MATERNITY = 'maternity',
  PATERNITY = 'paternity',
  UNPAID = 'unpaid'
}

// Leave Status
export enum LeaveStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled'
}

// Asset Categories
export enum AssetCategories {
  LAPTOP = 'laptop',
  PHONE = 'phone',
  MONITOR = 'monitor',
  DESK = 'desk',
  CHAIR = 'chair',
  OTHER = 'other'
}

// Asset Status
export enum AssetStatus {
  AVAILABLE = 'available',
  ASSIGNED = 'assigned',
  MAINTENANCE = 'maintenance',
  RETIRED = 'retired'
}

// API Response Interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Leave Request Interface
export interface LeaveRequest {
  id?: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveTypes;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  submittedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
  comments?: string;
}

// Asset Interface
export interface Asset {
  id?: string;
  name: string;
  category: AssetCategories;
  serialNumber?: string;
  status: AssetStatus;
  assignedTo?: string;
  assignedDate?: string;
  returnDate?: string;
  condition: string;
  location: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
}

// Policy Interface
export interface Policy {
  id?: string;
  title: string;
  category: string;
  content: string;
  version: string;
  effectiveDate: string;
  lastUpdated: string;
  author: string;
  tags: string[];
}

// Onboarding Task Interface
export interface OnboardingTask {
  id?: string;
  taskName: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  category: string;
  priority: string;
  requirements: string[];
  resources: string[];
}

// Employee Interface
export interface Employee {
  id?: string;
  email: string;
  name: string;
  role: UserRoles;
  department: string;
  position: string;
  hireDate: string;
  manager?: string;
  contactNumber?: string;
  address?: string;
  emergencyContact?: string;
}

// Dashboard Stats Interface
export interface DashboardStats {
  totalEmployees: number;
  activeLeaves: number;
  pendingApprovals: number;
  assetRequests: number;
  completionRate: number;
  recentActivities: Activity[];
}

// Activity Interface
export interface Activity {
  id: string;
  type: 'leave_request' | 'asset_request' | 'policy_update' | 'task_completion';
  description: string;
  timestamp: string;
  user: string;
  status?: string;
}

// Form Data Interfaces
export interface LeaveFormData {
  leaveType: LeaveTypes;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface AssetRequestFormData {
  assetName: string;
  category: AssetCategories;
  reason: string;
  urgency: 'low' | 'medium' | 'high';
  expectedReturnDate?: string;
}

export interface PolicyQueryFormData {
  query: string;
  category?: string;
  tags?: string[];
}

// Filter Interfaces
export interface TaskFilters {
  search: string;
  status: string;
  priority: string;
  category: string;
  assignee: string;
  sortBy: string;
  sortOrder: string;
  viewMode: string;
}

// Bulk Action Interface
export interface BulkAction {
  action: string;
  taskIds: string[];
  metadata?: any;
}

