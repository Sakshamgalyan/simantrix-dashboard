export interface HrmsEmployee {
  id: string;
  organizationId: string;
  employeeCode: string;
  employmentType: string;
  employmentStatus:
    "PROBATION" | "CONFIRMED" | "NOTICE_PERIOD" | "TERMINATED" | "RESIGNED";
  joiningDate: string;
  confirmationDate?: string;
  department?: {
    id: string;
    name: string;
    code: string;
  };
  designation?: {
    id: string;
    title: string;
    code: string;
  };
  profile?: {
    firstName: string;
    lastName: string;
    personalEmail: string;
    phone?: string;
    gender?: string;
  };
}

export interface HrmsDashboardSummary {
  headcount: {
    total: number;
    active: number;
    probation: number;
    retentionRate: number;
  };
  todayAttendance: {
    present: number;
    absent: number;
    onLeave: number;
    attendanceRate: number;
  };
  departments: Array<{
    id: string;
    name: string;
    code: string;
    employeeCount: number;
  }>;
}

export interface HrmsPayrollRun {
  id: string;
  month: number;
  year: number;
  status: string;
  totalEligibleEmployees: number;
  totalGrossPay: string | number;
  totalNetPay: string | number;
  totalDeductions: string | number;
  createdAt: string;
}

export type PeopleAdminTab =
  "overview" | "employees" | "payroll" | "recruitment";

export interface PeopleAdminState {
  currentTab: PeopleAdminTab;
  searchQuery: string;
  departmentFilter: string;
  statusFilter: string;
  page: number;
  limit: number;
}
