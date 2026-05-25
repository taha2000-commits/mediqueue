export type DoctorStatsDate = {
  day: string;
  appointments_count: number;
  completed: number;
  pending: number;
  accepted: number;
  cancelled: number;
  rejected: number;
  no_show: number;
};

export type StatsPeriod = "today" | "this_week" | "this_month";

export type DoctorStats = {
  doctor_id: string | null;

  total_appointments: number;
  total_completed: number;
  total_pending: number;
  total_accepted: number;
  total_cancelled: number;
  total_rejected: number;
  total_no_show: number;
  total_expired: number;

  period: StatsPeriod;

  range: {
    start: string;
    end: string;
  };

  dates: DoctorStatsDate[];
};

export type HospitalAppointmentsStats = DoctorStats & {
  total_expired: number;
  high_priority_requests_count: number;
  total_patients: number;
};

export type HospitalSpecializationsStats = {
  specialization: string;

  total_doctors: number;
  total_patients: number;
  total_appointments: number;

  appointments: {
    completed: number;
    pending: number;
    accepted: number;
    cancelled: number;
    rejected: number;
    no_show: number;
  };
};

export type DoctorsStats = {
  active_doctors: number;
  am_doctors_count: number;
  doctors_leaves_today_count: number;
  doctors_off_today_count: number;
  doctors_per_specialization: { specialization: string; count: number }[];
  pm_doctors_count: number;
  total_doctors: number;
};
