import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/apiFetch";
import { PatientStats } from "@/types/patients";

const useDoctorPatientsStats = ({ doctor_id }: { doctor_id: string }) => {
  return useQuery({
    queryKey: [doctor_id, "doctor-patients-stats"],
    queryFn: async () => {
      const data = await apiFetch<PatientStats>({
        url: `/stats/${doctor_id}/patients`,
      });
      return data;
    },
  });
};

export default useDoctorPatientsStats;
