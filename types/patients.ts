import { Database } from "@/lib/supabase/types";

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

export type BloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";

export type PatientWithAppointments = {
  id: string;
  doctor_id: string;

  name: string;
  phone: string;
  email: string;

  gender: string;
  age: number;

  blood_group: BloodGroup;

  conditions: string[];
  medications: string[];
  allergies: string[];

  created_at: string;

  last_visit: {
    date: string;
    time: string;
    doctor_name: string;
  };

  next_appointment: {
    date: string;
    time: string;
    doctor_name: string;
  };

  type: "new" | "returning";

  active: boolean;

  has_appointment_today: boolean;
  total_appointments_count: number;
  total_appointments: {
    pending_count: number;
    completed_count: number;
  };
  doctors:
    | {
        doctor_id: string;
        doctor_name: string;
        total_appointments_count: string;
      }[]
    | null;
};
