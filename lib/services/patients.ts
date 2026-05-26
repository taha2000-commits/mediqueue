import { PatientWithAppointments } from "@/types/patients";
import { ResponseType } from "@/types/types";

import { fetchData } from "../api/fetch";
import { getUser } from "../auth/getUser";

export const patientsService = {
  async getAll({
    params,
    doctor_id,
  }: {
    doctor_id?: string;
    params: Record<string, string | string[] | boolean | undefined>;
  }) {
    const values = Object.values(params || {}).map((v) => `${v}`);
    const data = await fetchData<ResponseType<PatientWithAppointments[]>>({
      url: `/patients`,
      params: { ...params, doctor_id },
      init: {
        next: {
          tags: ["patients", ...values],
        },
      },
    });

    return data;
  },
  async getPatient(id: string) {
    const user = await getUser();
    const data = await fetchData<PatientWithAppointments>({
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
