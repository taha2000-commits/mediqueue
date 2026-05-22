import { DoctorWithStats } from "@/types/doctors";
import { ResponseType } from "@/types/types";

import { fetchData } from "../api/fetch";

export const doctorsService = {
  async getDoctors(params: Record<string, string | string[] | undefined>) {
    const data = await fetchData<ResponseType<DoctorWithStats[]>>({
      url: "/doctors",
      params,
    });
    return data;
  },
};
