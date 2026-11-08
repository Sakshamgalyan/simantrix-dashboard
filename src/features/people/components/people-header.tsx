"use client";

import React from "react";
import { Card, Chip, Button, Typography } from "@galyan/ui";
import { UserPlus, RotateCw } from "lucide-react";
import { usePeopleAdmin } from "../context";
import {
  useGetHrmsSummaryQuery,
  useGetHrmsEmployeesQuery,
} from "../context/api";

export const PeopleHeader = () => {
  const { state } = usePeopleAdmin();
  const {
    data: summary,
    refetch: refetchSummary,
    isFetching: fetchingSummary,
  } = useGetHrmsSummaryQuery();
  const { refetch: refetchEmployees, isFetching: fetchingEmployees } =
    useGetHrmsEmployeesQuery({
      search: state.searchQuery || undefined,
      departmentId: state.departmentFilter || undefined,
      status: state.statusFilter || undefined,
      page: state.page,
      limit: state.limit,
    });

  const isRefreshing = fetchingSummary || fetchingEmployees;

  const handleRefresh = () => {
    void refetchSummary();
    void refetchEmployees();
  };

  const totalHeadcount = summary?.headcount?.total ?? 0;
  const presentToday = summary?.todayAttendance?.present ?? 0;

  return (
    <Card
      variant="elevated"
      radius="xl"
      padding="md"
      className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs"
    >
      <div className="flex flex-col justify-between gap-4 sm:gap-5 lg:flex-row lg:items-center">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Chip variant="soft" size="sm">
              Enterprise HRMS &amp; Workforce
            </Chip>
            <Chip variant="neutral" size="sm">
              {totalHeadcount} licensed staff
            </Chip>
            <Chip variant="success" size="sm">
              {presentToday} present today
            </Chip>
          </div>
          <Typography
            variant="h3"
            weight="bold"
            textColor="var(--gy-text)"
            className="text-lg sm:text-xl xl:text-2xl tracking-tight"
          >
            People &amp; Workforce Management
          </Typography>
          <Typography
            variant="p"
            textColor="var(--gy-text-secondary)"
            className="max-w-2xl text-xs sm:text-sm leading-relaxed"
          >
            Enterprise HRMS, compliance engine, automated payroll, and
            multi-stage recruitment.
          </Typography>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={
              <RotateCw
                className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            }
            disabled={isRefreshing}
            onClick={handleRefresh}
            className="flex-1 sm:flex-initial"
          >
            Refresh
          </Button>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<UserPlus className="size-3.5" />}
            className="flex-1 sm:flex-initial"
          >
            Add Employee
          </Button>
        </div>
      </div>
    </Card>
  );
};
