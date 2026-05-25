import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/apiFetch";
import { DoctorWithStats } from "@/types/doctors";

const useDoctor = (id?: string) => {
  return useQuery({
    queryKey: ["doctor", id],
    queryFn: async () => {
      const data = await apiFetch<DoctorWithStats>({
        url: `/doctors/${id}`,
      });
      return data;
    },
  });
};

export default useDoctor;
