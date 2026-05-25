import { Database } from "@/lib/supabase/types";

export type DoctorsRow = Database["public"]["Tables"]["doctors"]["Row"];
export type DoctorsInsert = Database["public"]["Tables"]["doctors"]["Insert"];
export type DoctorsUpdate = Database["public"]["Tables"]["doctors"]["Update"];
export type Doctor = DoctorsRow & { name: string; specialization: string };

export type DoctorWithStats = {
  appointments_count: number;
  avatar: string;
  avatar_updated_at: string;
  buffer_time: number;
  created_at: string;
  description_ar: string;
  description_en: string;
  email: string;
  id: string;
  is_active: boolean;
  language: Database["public"]["Enums"]["language"];
  name_ar: string;
  name_en: string;
  patients_count: number;
  phone: string;
  slot_duration: number;
  specialization_ar: string;
  specialization_en: string;
  today_appointments_count: {
    total: number;
    completed: number;
    pending: number;
    accepted: number;
    cancelled: number;
    rejected: number;
    no_show: number;
  };
  today_patients_count: number;
  capacity_percent: number;
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
