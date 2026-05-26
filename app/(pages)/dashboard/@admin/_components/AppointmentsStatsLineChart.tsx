"use client";
import React, { Dispatch, SetStateAction } from "react";
import { HashLoader } from "react-spinners";

import CustomSelect from "@/app/components/CustomSelect";
import { Separator } from "@/components/ui/separator";
import { PRIMARY_COLOR } from "@/lib/constants";
import { DoctorStatsDate, StatsPeriod } from "@/types/stats";

import AppointmentsLineChart from "./AppointmentsLineChart";

const AppointmentsStatsLineChart = ({
  data,
  isLoading,
  periodState,
}: {
  data: { total_appointments: number; dates: DoctorStatsDate[] };
  isLoading: boolean;
  periodState: [StatsPeriod, Dispatch<SetStateAction<StatsPeriod>>];
}) => {
  const [period, setPeriod] = periodState;

  const total = data?.total_appointments ?? 0;

  const chartData =
    data?.dates.map((date) => {
      return {
        name: date.day,
        total: date.appointments_count,
        pending: date.pending,
        completed: date.completed,
        accepted: date.accepted,
        cancelled: date.cancelled,
        rejected: date.rejected,
        no_show: date.no_show,
      };
    }) ?? [];

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
          {isLoading ? <HashLoader size={20} color={PRIMARY_COLOR} /> : null}
        </h3>
        <CustomSelect
          options={[
            { text: "this week", value: "this_week" },
            { text: "this month", value: "this_month" },
          ]}
          placeholder="period"
          defaultValue={period}
          className="w-fit rounded-lg"
          onValueChange={(val) => setPeriod(val as StatsPeriod)}
        />
      </div>

      <Separator className="mt-2 mb-4" />
      <AppointmentsLineChart chartData={chartData} />
    </div>
  );
};

export default AppointmentsStatsLineChart;
