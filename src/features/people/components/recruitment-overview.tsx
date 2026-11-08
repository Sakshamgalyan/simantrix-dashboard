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
import { Briefcase, UserPlus } from "lucide-react";
import { useGetHrmsCandidatesQuery } from "../context/api";

export const RecruitmentOverview = () => {
  const { data: candidates, isLoading } = useGetHrmsCandidatesQuery({});

  const candidateList = candidates || [];

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
              Recruitment &amp; Applicant Tracking System
            </Typography>
            <Typography
              variant="p"
              textColor="var(--gy-text-secondary)"
              className="text-xs sm:text-sm"
            >
              Multi-stage talent pipeline from Sourced to Hired with AI resume
              match scoring.
            </Typography>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<UserPlus className="size-3.5" />}
            className="shrink-0"
          >
            Source Candidate
          </Button>
        </div>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-44 w-full rounded-2xl" />
        </div>
      ) : candidateList.length === 0 ? (
        <Card
          variant="elevated"
          radius="xl"
          padding="lg"
          className="border border-[var(--gy-border)] bg-[var(--gy-surface)] shadow-xs"
        >
          <EmptyState
            icon={
              <Briefcase className="size-10 text-[var(--gy-text-subtle)]" />
            }
            title="No candidates in active pipeline"
            description="Source candidates or connect your public career portal to receive applications."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidateList.map((cand: any) => (
            <Card
              key={cand._id || cand.id}
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
                    {cand.firstName} {cand.lastName}
                  </Typography>
                  <Typography
                    variant="small"
                    textColor="var(--gy-text-subtle)"
                    className="text-xs"
                  >
                    {cand.currentTitle || "Applicant"} •{" "}
                    {cand.currentCompany || "Independent"}
                  </Typography>
                </div>
                <Chip variant="soft" size="sm">
                  {cand.status}
                </Chip>
              </CardHeader>
              <CardBody className="pt-3 flex flex-col gap-2">
                <div className="flex justify-between text-xs py-1 border-b border-[var(--gy-border-subtle)]">
                  <span className="text-[var(--gy-text-secondary)]">
                    Experience
                  </span>
                  <span className="font-medium text-[var(--gy-text)]">
                    {cand.experienceYears || 0} years
                  </span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-[var(--gy-border-subtle)]">
                  <span className="text-[var(--gy-text-secondary)]">
                    Match Score
                  </span>
                  <span className="font-semibold text-[var(--gy-success)]">
                    {cand.matchScore || 0}%
                  </span>
                </div>
                {cand.skills && cand.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {cand.skills.slice(0, 3).map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--gy-surface-subtle)] text-[var(--gy-text-secondary)] border border-[var(--gy-border)] font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
