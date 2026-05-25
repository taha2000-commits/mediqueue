"use client";
import { useState } from "react";

import useHospitalAppointmentsStats from "@/hooks/useHospitalAppointmentsStats";
import { StatsPeriod } from "@/types/stats";

import AppointmentsStatsLineChart from "./AppointmentsStatsLineChart";

const AppointmentsStatusStats = () => {
  const periodState = useState<StatsPeriod>("this_week");
  const { data, isPlaceholderData, isLoading } = useHospitalAppointmentsStats(
    periodState[0],
  );
  return (
    <AppointmentsStatsLineChart
      data={{
        dates: data?.dates ?? [],
        total_appointments: data?.total_appointments ?? 0,
      }}
      isLoading={isPlaceholderData || isLoading}
      periodState={periodState}
    />
  );
};

export default AppointmentsStatusStats;
