import { PatientsWithAppointments } from "@/types/patients";
import { ResponseType } from "@/types/types";

import { fetchData } from "../api/fetch";
import { getUser } from "../auth/getUser";

export const patientsService = {
  async getAll(params?: {
    params: Record<string, string | string[] | boolean | undefined>;
  }) {
    const user = await getUser();
    const values = Object.values(params?.params || {}).map((v) => `${v}`);
    const data = await fetchData<ResponseType<PatientsWithAppointments[]>>({
      url: `/${user?.id}/patients`,
      params: params ? { ...params.params } : undefined,
      init: {
        next: {
          tags: params ? ["patients", ...values] : ["patients"],
        },
      },
    });

    return data;
  },

  async getPatient(id: string) {
    const user = await getUser();
    const data = await fetchData<PatientsWithAppointments>({
      url: `/${user?.id}/patients/${id}`,
      init: {
        next: {
          tags: ["patient", id],
        },
      },
    });

    return data;
  },
};
