"use client";

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/lib/api/apiFetch";
import { AppointmentWithPriority } from "@/types/appointments";

import useUser from "./useUser";

const usePatientAppointments = (patient_id: string) => {
  const { data: user } = useUser();
  return useQuery({
    queryKey: ["patient-appointments", `${patient_id}`, "user+" + user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const data = await apiFetch<AppointmentWithPriority[]>({
        url: `/appointments/${user?.id}/${patient_id}`,
      });
      return data;
    },
  });
};

export default usePatientAppointments;
