export type AppointmentsStats = {
  appointments_count: number;
  specialization: string;
  today_appointments_count: number;
};

export type HospitalStats = {
  doctors_count: number;
  expired_requests_count: number;
  high_priority_requests_count: number;
  patients_count: number;
  pending_appointments_count: number;
  today_appointments_count: number;
  all_appointments_count: number;
  no_show_appointments_count: number;
  am_doctors_count: number;
  pm_doctors_count: number;
  doctors_leaves_today_count: number;
  doctors_off_today_count: number;
  accepted_requests_count: number;
};
