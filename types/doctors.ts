import { Database } from "@/lib/supabase/types";

export type DoctorsRow = Database["public"]["Tables"]["doctors"]["Row"];
export type DoctorsInsert = Database["public"]["Tables"]["doctors"]["Insert"];
export type DoctorsUpdate = Database["public"]["Tables"]["doctors"]["Update"];
export type Doctor = DoctorsRow & { name: string; specialization: string };
