import { Database } from "@/lib/supabase/types";

export type AppointmentRow = Database["public"]["Tables"]["appointments"]["Row"];
export type AppointmentInsert = Database["public"]["Tables"]["appointments"]["Insert"];
export type AppointmentUpdate = Database["public"]["Tables"]["appointments"]["Update"];

export type Appointment_Status =
  Database["public"]["Tables"]["appointments"]["Row"]["status"];
