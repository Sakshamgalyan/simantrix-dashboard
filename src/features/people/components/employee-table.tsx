"use client";

import React, { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  type Column,
  Chip,
  Button,
  Input,
  Typography,
  Avatar,
  Dropdown,
} from "@galyan/ui";
import {
  Search,
  Plus,
  Filter,
  Users,
  RotateCcw,
  Building2,
} from "lucide-react";
import {
  tablePagination,
  type PaginationMeta,
} from "@/features/common/pagination";
import { usePeopleAdmin } from "../context";
import {
  setSearchAction,
  setStatusFilterAction,
  setDepartmentFilterAction,
  setPageAction,
  resetFiltersAction,
} from "../context/action";
import { useGetHrmsEmployeesQuery } from "../context/api";
import type { HrmsEmployee } from "../types";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All Statuses" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PROBATION", label: "Probation" },
  { value: "NOTICE_PERIOD", label: "Notice Period" },
  { value: "TERMINATED", label: "Terminated" },
];

export const EmployeeTable = () => {
  const { state, dispatch } = usePeopleAdmin();
  const { data, isLoading, isFetching } = useGetHrmsEmployeesQuery({
    search: state.searchQuery.trim() || undefined,
    departmentId:
      state.departmentFilter !== "ALL" && state.departmentFilter
        ? state.departmentFilter
        : undefined,
    status:
      state.statusFilter !== "ALL" && state.statusFilter
        ? state.statusFilter
        : undefined,
    page: state.page,
    limit: state.limit,
  });

  const employees: HrmsEmployee[] =
    (data as any)?.items ||
    (data as any)?.data ||
    (Array.isArray(data) ? data : []);
  const rawMeta = (data as any)?.meta;
  const totalCount = rawMeta?.total ?? (data as any)?.total ?? employees.length;
  const totalPages =
    rawMeta?.totalPages ??
    Math.max(1, Math.ceil(totalCount / (state.limit || 10)));

  const paginationMeta: PaginationMeta = {
    total: totalCount,
    page: state.page,
    limit: state.limit,
    totalPages,
    hasNextPage: state.page < totalPages,
    hasPreviousPage: state.page > 1,
  };

  const hasFilters =
    Boolean(state.searchQuery.trim()) ||
    state.statusFilter !== "" ||
    state.departmentFilter !== "";

  const columns: Column<HrmsEmployee>[] = useMemo(
    () => [
      {
        key: "employee",
        header: "Employee",
        accessor: (emp) => {
          const fullName = emp.profile
            ? `${emp.profile.firstName} ${emp.profile.lastName}`.trim()
            : "Staff Member";
          const email = emp.profile?.personalEmail || "No email registered";
          return (
            <div className="flex items-center gap-3">
              <Avatar
                size="sm"
                name={fullName}
                fallback={fullName.slice(0, 2).toUpperCase()}
              />
              <div className="min-w-0">
                <Typography
                  variant="span"
                  weight="semibold"
                  textColor="var(--gy-text)"
                  className="text-sm truncate block"
                >
                  {fullName}
                </Typography>
                <Typography
                  variant="small"
                  textColor="var(--gy-text-secondary)"
                  className="text-xs truncate block"
                >
                  {email}
                </Typography>
              </div>
            </div>
          );
        },
      },
      {
        key: "code",
        header: "Emp Code",
        accessor: (emp) => (
          <Chip variant="neutral" size="xs">
            <span className="font-mono text-xs">{emp.employeeCode}</span>
          </Chip>
        ),
      },
      {
        key: "department",
        header: "Department",
        accessor: (emp) => (
          <div className="flex items-center gap-1.5">
            <Building2 className="size-3.5 text-[var(--gy-text-subtle)] shrink-0" />
            <Typography
              variant="small"
              weight="medium"
              textColor="var(--gy-text)"
              className="text-xs"
            >
              {emp.department?.name || "General"}
            </Typography>
          </div>
        ),
      },
      {
        key: "designation",
        header: "Designation",
        accessor: (emp) => (
          <Typography
            variant="small"
            textColor="var(--gy-text-secondary)"
            className="text-xs"
          >
            {emp.designation?.title || "Staff Member"}
          </Typography>
        ),
      },
      {
        key: "status",
        header: "Status",
        accessor: (emp) => {
          const status = emp.employmentStatus;
          const variant =
            status === "CONFIRMED"
              ? "success"
              : status === "PROBATION"
                ? "warning"
                : status === "NOTICE_PERIOD"
                  ? "primary"
                  : "neutral";
          return (
            <Chip variant={variant} size="sm">
              {status}
            </Chip>
          );
        },
      },
      {
        key: "joining",
        header: "Joining Date",
        accessor: (emp) => (
          <Typography
            variant="small"
            textColor="var(--gy-text-subtle)"
            className="text-xs"
          >
            {emp.joiningDate
              ? new Date(emp.joiningDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "—"}
          </Typography>
        ),
      },
    ],
    [],
  );

  return (
    <Card
      variant="elevated"
      radius="xl"
      padding="none"
      className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs overflow-hidden"
    >
      <CardHeader className="p-4 sm:p-5 border-b border-[var(--gy-border)]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Input
              placeholder="Search by name, email, employee code..."
              leftIcon={
                <Search className="size-4 text-[var(--gy-text-subtle)]" />
              }
              value={state.searchQuery}
              onChange={(e) => dispatch(setSearchAction(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Action & Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <Dropdown
              size="sm"
              options={STATUS_OPTIONS}
              value={state.statusFilter || "ALL"}
              onChange={(val) => dispatch(setStatusFilterAction(String(val)))}
              leftIcon={<Filter className="size-3.5" />}
              className="w-36"
            />

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<RotateCcw className="size-3.5" />}
                onClick={() => dispatch(resetFiltersAction())}
              >
                Reset
              </Button>
            )}

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="size-3.5" />}
            >
              Add Employee
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <Table<HrmsEmployee>
            columns={columns}
            data={employees}
            rowKey={(row) => row.id}
            hoverable
            size="md"
            isLoading={isLoading || isFetching}
            skeletonRows={5}
            pagination={tablePagination(paginationMeta)}
            onPageChange={(page) => dispatch(setPageAction(page))}
            emptyStateLabel={
              hasFilters ? "No matching staff found" : "No staff registered yet"
            }
            emptyStateMessage={
              hasFilters
                ? "Try adjusting your search query or status filter."
                : "Add employees to your organization to get started."
            }
            emptyStateIcon={
              <Users className="size-8 text-[var(--gy-text-subtle)]" />
            }
          />
        </div>
      </CardBody>
    </Card>
  );
};
