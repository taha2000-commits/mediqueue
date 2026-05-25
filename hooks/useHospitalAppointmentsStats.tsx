import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/apiFetch";
import { StatsPeriod, HospitalAppointmentsStats } from "@/types/stats";

const useHospitalAppointmentsStats = (period: StatsPeriod) => {
  return useQuery({
    queryKey: ["hospital-appointments-stats", period],
    queryFn: async () => {
      const res = await apiFetch<HospitalAppointmentsStats>({
        url: "/stats/hospital",
        params: { period },
      });
      return res;
    },
    placeholderData: keepPreviousData,
  });
};

export default useHospitalAppointmentsStats;
