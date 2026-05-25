import { PatientStats } from "@/types/patients";
import {
  DoctorsStats,
  DoctorStats,
  HospitalAppointmentsStats,
  HospitalSpecializationsStats,
  StatsPeriod,
} from "@/types/stats";

import { fetchData } from "../api/fetch";
import { getUser } from "../auth/getUser";

export const statsServices = {
  hospital: {
    async getStats(period?: StatsPeriod) {
      const res = await fetchData<HospitalAppointmentsStats>({
        url: "/stats/hospital",
        init: {
          next: {
            tags: ["hospital-appointments-stats", period ?? ""],
            revalidate: 60,
          },
        },
        params: { period },
      });
      return res;
    },
    async getDoctorsStats() {
      const data = await fetchData<DoctorsStats>({
        url: "/stats/hospital/doctors",
      });
      return data;
    },
    async getSpecializationsStats(params?: {
      specialization?: string;
      period?: string;
    }) {
      const values = Object.values(params ?? {});
      const res = await fetchData<HospitalSpecializationsStats[]>({
        url: `/stats/hospital/specializations`,
        params,
        init: {
          next: {
            tags: ["hospital-specializations-stats", ...values].filter(
              Boolean,
            ) as string[],
          },
        },
      });
      return res;
    },
  },
  doctor: {
    async getStats(
      doctor_id?: string,
      params?: {
        start?: string;
        end?: string;
        period?: "today" | "this_week" | "this_month";
      },
    ) {
      const user = doctor_id ? { id: doctor_id } : await getUser();
      const id = user?.id;
      if (!id) return null;
      const data = await fetchData<DoctorStats>({
        url: `/stats/${id}`,
        init: {
          next: {
            tags: ["doctor-stats", id, params?.period ?? ""],
          },
        },
        params,
      });
      return data;
    },
    async getPatientsStats(doctor_id?: string) {
      const user = doctor_id ? { id: doctor_id } : await getUser();
      const id = user?.id;
      if (!id) return null;
      const data = await fetchData<PatientStats>({
        url: `/stats/${id}/patients`,
        init: {
          next: {
            tags: [id, "patients-stats"],
          },
        },
      });

      return data;
    },
  },
};
