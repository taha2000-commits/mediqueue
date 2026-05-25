import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/apiFetch";
import { DoctorStats } from "@/types/stats";

const useDoctorStats = ({
  doctor_id,
  params,
  isKeepPreviousData = false,
}: {
  doctor_id: string;
  params?: {
    start?: string;
    end?: string;
    period?: "today" | "this_week" | "this_month";
  };
  isKeepPreviousData?: boolean;
}) => {
  return useQuery({
    queryKey: ["doctor-stats", doctor_id, params?.period ?? ""],
    queryFn: async () => {
      const data = await apiFetch<DoctorStats>({
        url: `/stats/${doctor_id}`,
        params,
      });
      return data;
    },
    placeholderData: isKeepPreviousData ? keepPreviousData : undefined,
  });
};

export default useDoctorStats;
