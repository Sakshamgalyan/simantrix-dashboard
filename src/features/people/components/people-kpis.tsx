"use client";

import React from "react";
import {
  Card,
  Chip,
  AnimatedNumber,
  ProgressBar,
  Typography,
  Skeleton,
} from "@galyan/ui";
import { Users, Clock, CalendarCheck, TrendingUp } from "lucide-react";
import { useGetHrmsSummaryQuery } from "../context/api";

const ICON_TILE =
  "grid size-8 sm:size-9 place-items-center rounded-xl shrink-0";

export const PeopleKpis = () => {
  const { data: summary, isLoading } = useGetHrmsSummaryQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-28 w-full rounded-2xl" />
      </div>
    );
  }

  const totalHeadcount = summary?.headcount?.total ?? 0;
  const activeCount = summary?.headcount?.active ?? totalHeadcount;
  const presentToday = summary?.todayAttendance?.present ?? 0;
  const attendanceRate =
    summary?.todayAttendance?.attendanceRate ??
    (totalHeadcount > 0
      ? Math.round((presentToday / totalHeadcount) * 100)
      : 0);
  const retentionRate = summary?.headcount?.retentionRate ?? 97.4;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {/* 1. Total Headcount */}
      <Card
        variant="elevated"
        radius="xl"
        padding="md"
        className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs hover:border-[var(--gy-border-strong)] transition-colors"
      >
        <div className="flex items-center justify-between gap-2">
          <Typography
            variant="label"
            weight="medium"
            textColor="var(--gy-text-secondary)"
            className="text-xs uppercase tracking-wider truncate"
          >
            Total Headcount
          </Typography>
          <div
            className={`${ICON_TILE} bg-[var(--gy-primary)]/10 text-[var(--gy-primary)]`}
          >
            <Users className="size-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--gy-text)]">
            <AnimatedNumber value={totalHeadcount} />
          </div>
          <Typography
            variant="small"
            textColor="var(--gy-text-subtle)"
            className="text-xs"
          >
            licensed staff
          </Typography>
        </div>
        <div className="mt-2.5">
          <ProgressBar
            progress={
              totalHeadcount > 0
                ? Math.min(
                    100,
                    Math.round((activeCount / totalHeadcount) * 100),
                  )
                : 100
            }
            variant="primary"
            size="sm"
            showLabel={false}
          />
        </div>
        <Typography
          variant="small"
          textColor="var(--gy-text-subtle)"
          className="mt-2 text-xs block truncate"
        >
          {activeCount} confirmed active roles
        </Typography>
      </Card>

      {/* 2. Present Today */}
      <Card
        variant="elevated"
        radius="xl"
        padding="md"
        className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs hover:border-[var(--gy-border-strong)] transition-colors"
      >
        <div className="flex items-center justify-between gap-2">
          <Typography
            variant="label"
            weight="medium"
            textColor="var(--gy-text-secondary)"
            className="text-xs uppercase tracking-wider truncate"
          >
            Present Today
          </Typography>
          <div
            className={`${ICON_TILE} bg-[var(--gy-success)]/10 text-[var(--gy-success)]`}
          >
            <Clock className="size-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--gy-success)]">
            <AnimatedNumber value={presentToday} />
          </div>
          <Chip variant="success" size="sm">
            Live
          </Chip>
        </div>
        <div className="mt-2.5 h-1.5 w-full rounded-full bg-[var(--gy-surface-sunken)] overflow-hidden">
          <div
            className="h-full bg-[var(--gy-success)] transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(5, totalHeadcount > 0 ? (presentToday / totalHeadcount) * 100 : 0))}%`,
            }}
          />
        </div>
        <Typography
          variant="small"
          textColor="var(--gy-text-subtle)"
          className="mt-2 text-xs block truncate"
        >
          {summary?.todayAttendance?.onLeave ?? 0} on approved leave
        </Typography>
      </Card>

      {/* 3. Attendance Rate */}
      <Card
        variant="elevated"
        radius="xl"
        padding="md"
        className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs hover:border-[var(--gy-border-strong)] transition-colors"
      >
        <div className="flex items-center justify-between gap-2">
          <Typography
            variant="label"
            weight="medium"
            textColor="var(--gy-text-secondary)"
            className="text-xs uppercase tracking-wider truncate"
          >
            Attendance Rate
          </Typography>
          <div className={`${ICON_TILE} bg-blue-500/10 text-blue-600`}>
            <CalendarCheck className="size-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
            <AnimatedNumber value={attendanceRate} />%
          </div>
          <Typography
            variant="small"
            textColor="var(--gy-text-subtle)"
            className="text-xs"
          >
            month-to-date
          </Typography>
        </div>
        <div className="mt-2.5">
          <ProgressBar
            progress={attendanceRate}
            variant="primary"
            size="sm"
            showLabel={false}
          />
        </div>
        <Typography
          variant="small"
          textColor="var(--gy-text-subtle)"
          className="mt-2 text-xs block truncate"
        >
          Target: 95% threshold
        </Typography>
      </Card>

      {/* 4. Retention Rate */}
      <Card
        variant="elevated"
        radius="xl"
        padding="md"
        className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs hover:border-[var(--gy-border-strong)] transition-colors"
      >
        <div className="flex items-center justify-between gap-2">
          <Typography
            variant="label"
            weight="medium"
            textColor="var(--gy-text-secondary)"
            className="text-xs uppercase tracking-wider truncate"
          >
            Retention Rate
          </Typography>
          <div className={`${ICON_TILE} bg-purple-500/10 text-purple-600`}>
            <TrendingUp className="size-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5 sm:gap-2">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
            {retentionRate}%
          </div>
          <Chip variant="soft" size="sm">
            Annual
          </Chip>
        </div>
        <div className="mt-2.5 h-1.5 w-full rounded-full bg-[var(--gy-surface-sunken)] overflow-hidden">
          <div
            className="h-full bg-purple-600 transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(10, retentionRate))}%` }}
          />
        </div>
        <Typography
          variant="small"
          textColor="var(--gy-text-subtle)"
          className="mt-2 text-xs block truncate"
        >
          Top tier workforce retention
        </Typography>
      </Card>
    </div>
  );
};
