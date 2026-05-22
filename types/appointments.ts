import { Database } from "@/lib/supabase/types";

import { Appointment_Status } from "./enums";
import { Patient } from "./patients";

export type AppointmentInsert =
  Database["public"]["Tables"]["appointments"]["Insert"];
export type AppointmentUpdate =
  Database["public"]["Tables"]["appointments"]["Update"];

export type AppointmentStats = {
  all_count: number;
  pending_count: number;
  completed_count: number;
  cancelled_count: number;
  rejected_count: number;
  accepted_count: number;
  in_progress_count: number;
  expired_count: number;
};

export type AppointmentWithPriority = {
  id: number;
  created_at: string;
  doctor_id: string;
  date: string;
  time: string;
  status: Appointment_Status;
  type: Database["public"]["Enums"]["appointment_type"];
  patient_id: string;
  patient: Patient;
  appointment_datetime: string;
  remaining_time: string;
  priority: "high" | "medium" | "low" | "expired" | null;
  is_expired: boolean;
  notes: string;
};
