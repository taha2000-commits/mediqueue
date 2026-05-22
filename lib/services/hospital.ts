import { AppointmentsStats, HospitalStats } from "@/types/hospital";

import { fetchData } from "../api/fetch";

export const hospitalService = {
  async getStats() {
    const res = await fetchData<HospitalStats>({
      url: "/hospital/stats",
      init: {
        next: {
          tags: ["hospital-stats"],
        },
      },
    });
    return res;
  },
  async getSpecializationAppointmentsStats(specialization?: string) {
    const res = await fetchData<AppointmentsStats[]>({
      url: `/hospital/appointments/stats`,
      params: { specialization: specialization },
      init: {
        next: {
          tags: [
            "hospital-appointments-stats",
            specialization
              ? `hospital-appointments-stats-${specialization}`
              : undefined,
          ].filter(Boolean) as string[],
        },
      },
    });
    return res;
  },
  async getLastWeekAppointmentsStats() {
    const res = await fetchData<
      {
        appointments_count: number;
        day: string;
      }[]
    >({
      url: `/hospital/appointments/lastweek`,
      init: {
        next: {
          tags: ["lastweek-appointments-stats"],
        },
      },
    });
    return res;
  },
};
