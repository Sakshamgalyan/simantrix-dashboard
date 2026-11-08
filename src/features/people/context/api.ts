import { dashboardApi } from "@/store";
import type {
  HrmsDashboardSummary,
  HrmsEmployee,
  HrmsPayrollRun,
} from "../types";

export const peopleApi = dashboardApi.injectEndpoints({
  endpoints: (build) => ({
    getHrmsSummary: build.query<HrmsDashboardSummary, void>({
      query: () => "/hrms/dashboard/summary",
      providesTags: ["Hrms"],
    }),

    getHrmsEmployees: build.query<
      { data: HrmsEmployee[]; total: number; page: number; limit: number },
      {
        search?: string;
        departmentId?: string;
        status?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => ({
        url: "/hrms/employees",
        params,
      }),
      providesTags: ["Hrms"],
    }),

    getHrmsPayrollRuns: build.query<HrmsPayrollRun[], void>({
      query: () => "/hrms/payroll/runs",
      providesTags: ["Hrms"],
    }),

    calculatePayrollRun: build.mutation<
      HrmsPayrollRun,
      { month: number; year: number }
    >({
      query: ({ month, year }) => ({
        url: `/hrms/payroll/runs/${year}/${month}/calculate`,
        method: "POST",
      }),
      invalidatesTags: ["Hrms"],
    }),

    getHrmsCandidates: build.query<any[], { status?: string }>({
      query: (params) => ({
        url: "/hrms/recruitment/candidates",
        params,
      }),
      providesTags: ["Hrms"],
    }),
  }),
});

export const {
  useGetHrmsSummaryQuery,
  useGetHrmsEmployeesQuery,
  useGetHrmsPayrollRunsQuery,
  useCalculatePayrollRunMutation,
  useGetHrmsCandidatesQuery,
} = peopleApi;
