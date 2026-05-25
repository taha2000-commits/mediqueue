"use client";
import { useState } from "react";
import { HashLoader } from "react-spinners";

import CustomSelect from "@/app/components/CustomSelect";
import { Separator } from "@/components/ui/separator";
import useDoctorStats from "@/hooks/useDoctorStats";
import { PRIMARY_COLOR, status_colors } from "@/lib/constants";
import { DoctorStatsPeriod } from "@/types/stats";

import PieChartWithCustomizedLabel from "./AppointmentsPieCharts";

export default function AppointmentsStatsPiChart({
  doctor_id,
}: {
  doctor_id: string;
}) {
  const [period, setPeriod] = useState<DoctorStatsPeriod>("this_week");

  const { data: doctor_stats, isPlaceholderData } = useDoctorStats({
    doctor_id,
    params: {
      period: period,
    },
    isKeepPreviousData: true,
  });

  const stats = {
    total: doctor_stats?.total_appointments,
    accepted: doctor_stats?.total_accepted,
    pending: doctor_stats?.total_pending,
    completed: doctor_stats?.total_completed,
    cancelled: doctor_stats?.total_cancelled,
    no_show: doctor_stats?.total_no_show,
    rejected: doctor_stats?.total_rejected,
  };

  const total = stats?.total ?? 0;

  const chartData = Object.entries(stats)
    .filter(([key]) => key !== "total")
    .map(([key, value]) => {
      const percentage = total
        ? Number((((value as number) / total) * 100).toFixed(0))
        : ((value as number) ?? 0);

      return {
        name: key,
        value: percentage,
        color: status_colors[key as keyof typeof status_colors] ?? "#eee",
      };
    });

  return (
    <div className="bg-secondary flex-1 rounded-xl p-3 shadow">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-4 text-xl font-semibold">
          <p>
            {period == "today"
              ? "Daily"
              : period == "this_month"
                ? "monthly"
                : "weekly"}{" "}
            Appointments (<span className="text-tertiary">{total}</span>)
          </p>
          {isPlaceholderData ? (
            <HashLoader size={20} color={PRIMARY_COLOR} />
          ) : null}
        </h3>
        <CustomSelect
          options={[
            { text: "today", value: "today" },
            { text: "this week", value: "this_week" },
            { text: "this month", value: "this_month" },
          ]}
          placeholder="period"
          defaultValue={period}
          className="w-fit rounded-lg"
          onValueChange={(val) => setPeriod(val as DoctorStatsPeriod)}
        />
      </div>

      <Separator className="mt-2 mb-4" />

      <div className="flex items-center gap-6">
        <PieChartWithCustomizedLabel data={chartData} />
        <div className="flex flex-col gap-2">
          {chartData.map((stat) => (
            <div key={stat.name} className="flex items-center gap-2 text-sm">
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor: stat.color,
                }}
              ></div>
              <div className="flex flex-1 items-center justify-between gap-6">
                <span className="font-medium">{stat.name}</span>
                <span className="text-muted-foreground">
                  {stat.value}
                  {stat.name === "all" ? "" : "%"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
