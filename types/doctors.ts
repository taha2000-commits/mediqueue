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
  today_appointments_count: number;
  today_patients_count: number;
  capacity_percent: number;
};
