import { Database } from "@/lib/supabase/types";
export type PatientsWithAppointments =
  Database["public"]["Views"]["patients_with_appointments"]["Row"];
export type Patient = Database["public"]["Tables"]["patients"]["Row"];

export type NewPatient = Database["public"]["Tables"]["patients"]["Insert"];

export type UpdatePatient = Database["public"]["Tables"]["patients"]["Update"];

export type PatientStats = {
  all_count: number;
  active_count: number;
  inactive_count: number;
  returning_count: number;
  new_count: number;
};
