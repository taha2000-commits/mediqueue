"use server";

import { revalidatePath, updateTag } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { AppointmentWithPriority } from "@/types/appointments";
import { Appointment_Status } from "@/types/enums";

export async function changeStatus(
  reqId: number,
  status: Appointment_Status,
): Promise<{
  isError: boolean;
  isSuccess: boolean;
  error: string | null;
  data: AppointmentWithPriority | null;
}> {
  const db = await createClient();
  const { data, error, success } = await db
    .from("appointments")
    .update({ status: status })
    .eq("id", reqId)
    .select()
    .single();

  if (error)
    return {
      isError: true,
      isSuccess: false,
      error: error.message,
      data: null,
    };

  revalidatePath("/requests");
  updateTag("appointments");

  return {
    isError: false,
    isSuccess: success,
    error: null,
    data: data as AppointmentWithPriority,
  };
}
