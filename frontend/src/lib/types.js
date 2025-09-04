// Leave Management Types
export const LeaveTypes = {
  ANNUAL: 'annual',
  SICK: 'sick',
  UNPAID: 'unpaid',
  MATERNITY: 'maternity',
  PATERNITY: 'paternity',
  BEREAVEMENT: 'bereavement'
};

export const LeaveStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
};

// Asset Management Types
export const AssetCategories = {
  LAPTOP: 'laptop',
  DOCK: 'dock',
  MONITOR: 'monitor',
  PHONE: 'phone',
  TABLET: 'tablet',
  ACCESSORY: 'accessory'
};

export const AssetStatus = {
  AVAILABLE: 'available',
  ASSIGNED: 'assigned',
  MAINTENANCE: 'maintenance',
  RETIRED: 'retired'
};

// User Roles
export const UserRoles = {
  EMPLOYEE: 'employee',
  HR_MANAGER: 'hr_manager',
  ADMIN: 'admin'
};

// API Response Types
export const ApiResponse = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning'
};
