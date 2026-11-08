"use client";

import React from "react";
import { Users, CreditCard, Briefcase } from "lucide-react";
import { usePeopleAdmin } from "../context";
import { setTabAction } from "../context/action";
import { useGetHrmsSummaryQuery } from "../context/api";
import { PeopleHeader } from "./people-header";
import { PeopleKpis } from "./people-kpis";
import { EmployeeTable } from "./employee-table";
import { PayrollOverview } from "./payroll-overview";
import { RecruitmentOverview } from "./recruitment-overview";
import type { PeopleAdminTab } from "../types";

export const PeopleContent = () => {
  const { state, dispatch } = usePeopleAdmin();
  const { data: summary } = useGetHrmsSummaryQuery();

  const handleTabChange = (tab: PeopleAdminTab) => {
    dispatch(setTabAction(tab));
  };

  const totalHeadcount = summary?.headcount?.total ?? 0;

  return (
    <div className="space-y-6">
      {/* 1. Header Card */}
      <PeopleHeader />

      {/* 2. KPI Metrics Grid */}
      <PeopleKpis />

      {/* 3. Segmented Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[var(--gy-surface-subtle)] border border-[var(--gy-border)] w-fit">
        <button
          type="button"
          onClick={() => handleTabChange("overview")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            state.currentTab === "overview" || state.currentTab === "employees"
              ? "bg-[var(--gy-surface)] text-[var(--gy-text)] shadow-xs border border-[var(--gy-border)]"
              : "text-[var(--gy-text-secondary)] hover:text-[var(--gy-text)] hover:bg-[var(--gy-surface-hover)]"
          }`}
        >
          <Users className="size-3.5" />
          <span>Staff Directory</span>
          {totalHeadcount > 0 && (
            <span className="ml-0.5 text-[11px] px-1.5 py-0.2 rounded-full bg-[var(--gy-surface-sunken)] text-[var(--gy-text-secondary)] font-medium">
              {totalHeadcount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("payroll")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            state.currentTab === "payroll"
              ? "bg-[var(--gy-surface)] text-[var(--gy-text)] shadow-xs border border-[var(--gy-border)]"
              : "text-[var(--gy-text-secondary)] hover:text-[var(--gy-text)] hover:bg-[var(--gy-surface-hover)]"
          }`}
        >
          <CreditCard className="size-3.5" />
          <span>Payroll &amp; Disbursal</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabChange("recruitment")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            state.currentTab === "recruitment"
              ? "bg-[var(--gy-surface)] text-[var(--gy-text)] shadow-xs border border-[var(--gy-border)]"
              : "text-[var(--gy-text-secondary)] hover:text-[var(--gy-text)] hover:bg-[var(--gy-surface-hover)]"
          }`}
        >
          <Briefcase className="size-3.5" />
          <span>ATS &amp; Candidates</span>
        </button>
      </div>

      {/* 4. Tab Panels */}
      {(state.currentTab === "overview" ||
        state.currentTab === "employees") && <EmployeeTable />}
      {state.currentTab === "payroll" && <PayrollOverview />}
      {state.currentTab === "recruitment" && <RecruitmentOverview />}
    </div>
  );
};
