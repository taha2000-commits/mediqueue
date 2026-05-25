import { AppointmentWithPriority } from "@/types/appointments";
import { ResponseType } from "@/types/types";

import { fetchData } from "../api/fetch";
import { getUser } from "../auth/getUser";

export const appointmentsService = {
  async getAll(params?: {
    params: Record<string, string | string[] | undefined>;
  }) {
    const user = await getUser();
    const values = Object.values(params?.params || {}).map((v) => `${v}`);

    const data = await fetchData<ResponseType<AppointmentWithPriority[]>>({
      url: `/appointments/${user?.id}`,
      params: params ? { ...params.params } : undefined,
      init: {
        next: {
          tags: params
            ? ["appointments", `${user?.id}`, ...values]
            : ["appointments"],
        },
      },
    });
    return data;
  },

  async getRequests(params?: {
    params: Record<string, string | string[] | undefined>;
  }) {
    const user = await getUser();
    const values = Object.values(params?.params || {}).map((v) => `${v}`);
    const data = await fetchData<ResponseType<AppointmentWithPriority[]>>({
      url: `/requests/${user?.id}`,
      params: params ? { ...params.params } : undefined,
      init: {
        next: {
          tags: params ? ["requests", `${user?.id}`, ...values] : ["requests"],
        },
      },
    });
    return data;
  },
  async getPatientAppointments(patient_id: string) {
    const user = await getUser();

    const data = await fetchData<AppointmentWithPriority[]>({
      url: `/appointments/${user?.id}/${patient_id}`,
      init: {
        next: {
          tags: ["patient-appointments", `${patient_id}`],
        },
      },
    });

    return data;
  },
};
