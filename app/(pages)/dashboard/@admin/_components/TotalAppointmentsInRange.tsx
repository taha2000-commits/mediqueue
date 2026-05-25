"use client";

import { useState } from "react";

import useHospitalAppointmentsStats from "@/hooks/useHospitalAppointmentsStats";
import { StatsPeriod } from "@/types/stats";

import AppointmentsStatsAreaChart from "./AppointmentsStatsAreaChart";

const TotalAppointmentsInRange = () => {
  const periodState = useState<StatsPeriod>("this_week");

  const { data, isPlaceholderData } = useHospitalAppointmentsStats(
    periodState[0],
  );
  return (
    <AppointmentsStatsAreaChart
      data={{
        dates: data?.dates ?? [],
        total_appointments: data?.total_appointments ?? 0,
      }}
      isLoading={isPlaceholderData}
      periodState={periodState}
    />
  );
};

export default TotalAppointmentsInRange;
