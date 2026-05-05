import { Database } from "@/lib/supabase/types";

export type ScheduleRow =
  Database["public"]["Tables"]["doctor_availability"]["Row"];
export type ScheduleInsert =
  Database["public"]["Tables"]["doctor_availability"]["Insert"];
export type ScheduleUpdate =
  Database["public"]["Tables"]["doctor_availability"]["Update"];


