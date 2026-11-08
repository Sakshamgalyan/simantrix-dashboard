"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Typography,
  Chip,
  Skeleton,
  EmptyState,
} from "@galyan/ui";
import { CreditCard, Play } from "lucide-react";
import {
  useGetHrmsPayrollRunsQuery,
  useCalculatePayrollRunMutation,
} from "../context/api";
import type { HrmsPayrollRun } from "../types";

export const PayrollOverview = () => {
  const { data: runs, isLoading } = useGetHrmsPayrollRunsQuery();
  const [calculateRun, { isLoading: isCalculating }] =
    useCalculatePayrollRunMutation();

  const handleRunPayroll = async () => {
    const now = new Date();
    await calculateRun({
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Action banner */}
      <Card
        variant="elevated"
        radius="xl"
        padding="md"
        className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Typography
              variant="h5"
              weight="bold"
              textColor="var(--gy-text)"
              className="text-base sm:text-lg"
            >
              Payroll Processing Engine
            </Typography>
            <Typography
              variant="p"
              textColor="var(--gy-text-secondary)"
              className="text-xs sm:text-sm"
            >
              India-compliant statutory deductions (EPF 12%, Professional Tax,
              TDS) and automated direct disbursals.
            </Typography>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Play className="size-3.5" />}
            loading={isCalculating}
            onClick={handleRunPayroll}
            className="shrink-0"
          >
            Execute Current Month Payroll
          </Button>
        </div>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
      ) : !runs || runs.length === 0 ? (
        <Card
          variant="elevated"
          radius="xl"
          padding="lg"
          className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs"
        >
          <EmptyState
            icon={
              <CreditCard className="size-10 text-[var(--gy-text-subtle)]" />
            }
            title="No payroll runs executed yet"
            description="Click 'Execute Current Month Payroll' to calculate payslips and statutory deductions for eligible employees."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {runs.map((run: HrmsPayrollRun) => (
            <Card
              key={run.id}
              variant="elevated"
              radius="xl"
              padding="md"
              className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs hover:border-[var(--gy-border-strong)] transition-colors"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[var(--gy-border)]">
                <div>
                  <Typography
                    variant="h6"
                    weight="bold"
                    textColor="var(--gy-text)"
                    className="text-sm"
                  >
                    {new Date(run.year, run.month - 1).toLocaleString(
                      "default",
                      {
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </Typography>
                  <Typography
                    variant="small"
                    textColor="var(--gy-text-subtle)"
                    className="text-xs"
                  >
                    {run.totalEligibleEmployees} employees processed
                  </Typography>
                </div>
                <Chip
                  variant={run.status === "COMPLETED" ? "success" : "warning"}
                  size="sm"
                >
                  {run.status}
                </Chip>
              </CardHeader>
              <CardBody className="pt-3 flex flex-col gap-2">
                <div className="flex justify-between text-xs py-1 border-b border-[var(--gy-border-subtle)]">
                  <span className="text-[var(--gy-text-secondary)]">
                    Gross Pay
                  </span>
                  <span className="font-mono font-medium text-[var(--gy-text)]">
                    ₹{Number(run.totalGrossPay).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-[var(--gy-border-subtle)]">
                  <span className="text-[var(--gy-text-secondary)]">
                    Deductions (PF+PT)
                  </span>
                  <span className="font-mono text-[var(--gy-danger)]">
                    -₹{Number(run.totalDeductions).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-xs py-1.5 font-semibold">
                  <span className="text-[var(--gy-text)]">Net Disbursal</span>
                  <span className="font-mono text-[var(--gy-success)] text-sm">
                    ₹{Number(run.totalNetPay).toLocaleString("en-IN")}
                  </span>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
