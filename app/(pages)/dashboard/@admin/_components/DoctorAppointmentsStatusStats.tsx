"use client";
import { useState } from "react";

import useDoctorStats from "@/hooks/useDoctorStats";
import { DoctorStatsPeriod } from "@/types/stats";

import AppointmentsStatsLineChart from "./AppointmentsStatsLineChart";

const DoctorAppointmentsStatusStats = ({
  doctor_id,
}: {
  doctor_id: string;
}) => {
  const periodState = useState<DoctorStatsPeriod>("this_week");
  const { data, isPlaceholderData, isLoading } = useDoctorStats({
    doctor_id,
    isKeepPreviousData: true,
    params: { period: periodState[0] },
  });
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

export default DoctorAppointmentsStatusStats;
