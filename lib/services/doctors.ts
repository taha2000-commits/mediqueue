import { DoctorsInsert, DoctorWithStats } from "@/types/doctors";
import { ResponseType } from "@/types/types";

import { fetchData } from "../api/fetch";
import { createClient } from "../supabase/server";

export const doctorsService = {
  async getDoctors(params: Record<string, string | string[] | undefined>) {
    const values = Object.values(params?.params || {}).map((v) => `${v}`);

    const data = await fetchData<ResponseType<DoctorWithStats[]>>({
      url: "/doctors",
      params,
      init: {
        next: {
          tags: params ? ["doctors", ...values] : ["doctors"],
        },
      },
    });
    return data;
  },

  async getDoctor(id: string) {
    const data = await fetchData<DoctorWithStats>({
      url: `/doctors/${id}`,
      init: {
        next: {
          tags: ["doctor", id],
        },
      },
    });
    return data;
  },
  async addDoctor(body: DoctorsInsert) {
    const db = await createClient();
    const data = await db.from("doctors").insert([body]);
    return data;
  },
};
