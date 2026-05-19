"use server";
import { AppointmentInsert } from "@/types/appointments";

import { createClient } from "../supabase/server";

export const bookAppointment = async (body: AppointmentInsert) => {
  const db = await createClient();
  return await db.from("appointments").insert([body]);
};
