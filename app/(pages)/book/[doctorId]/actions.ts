"use server";

import { revalidatePath, updateTag } from "next/cache";

import { bookAppointment } from "@/lib/services/book-appointment";
import { Database } from "@/lib/supabase/types";

export default async function bookAction(
  _:
    | { success: string; error: undefined }
    | { success: undefined; error: string }
    | undefined,
  formData: FormData,
) {
  const doctor_id = (formData.get("doctor_id") as string) || undefined;
  // const patient_email = (formData.get("patient_email") as string) || undefined;
  // const patient_name = (formData.get("patient_name") as string) || undefined;
  // const patient_phone = (formData.get("patient_phone") as string) || undefined;
  // const patient_age = (formData.get("patient_age") as string) || undefined;
  const type = (formData.get("type") as string) || undefined;
  const date = (formData.get("date") as string) || undefined;
  const time = (formData.get("time") as string) || undefined;

  const { error, success } = await bookAppointment({
    doctor_id: doctor_id!,
    date: date!,
    time: time!,
    type: type! as Database["public"]["Enums"]["appointment_type"],
  });

  revalidatePath("/book");
  updateTag("appointments");

  if (success)
    return {
      success: "appointmentSuccess",
      error: undefined,
    };

  return {
    success: undefined,
    error: error.message,
  };
}
