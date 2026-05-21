import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/apiFetch";
import { PatientsWithAppointments } from "@/types/patients";

import useUser from "./useUser";

const usePatient = (patient_id: string) => {
  const { data: user } = useUser();

  return useQuery({
    queryKey: ["patient", `${patient_id}`],
    enabled: !!user?.id,
    queryFn: async () => {
      const data = await apiFetch<PatientsWithAppointments>({
        url: `/${user?.id}/patients/${patient_id}`,
      });

      return data;
    },
  });
};

export default usePatient;
