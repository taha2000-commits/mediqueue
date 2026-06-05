"use server";
import { revalidatePath, updateTag } from "next/cache";
import { v4 as uuidV4 } from "uuid";

import { getDoctorUser } from "@/lib/auth/getDoctorUser";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/lib/supabase/types";

import { DefaultValuesForm } from "./_components/AvailabilitySettings";
import { UpdateDoctorFormType } from "./_components/UpdateDoctorForm";

export async function changeData(
  _: { isSuccess: boolean; successMsg?: string; error?: string } | undefined,
  formData: FormData,
) {
  const doctor = await getDoctorUser();
  const {
    photo,
    description_en,
    email,
    name_en,
    phone,
    specialization_en,
    name_ar,
    specialization_ar,
    description_ar,
  } = Object.fromEntries(formData.entries()) as UpdateDoctorFormType;

  if (doctor.id) {
    const avatar_updated_at = uuidV4();
    const db = await createClient();
    let filePath;
    if (photo.size > 0) {
      const { data, error } = await db.storage
        .from("doctors_images")
        .upload(`/${doctor.id}/${avatar_updated_at}`, photo, {
          upsert: true,
        });
      filePath = data?.fullPath;
      if (error) return { isSuccess: false, error: error.message };
    }

    const { error: updateError } = await db
      .from("doctors")
      .update({
        avatar: filePath,
        name_en,
        description_en,
        email,
        phone,
        specialization_en,
        name_ar,
        specialization_ar,
        description_ar,
      })
      .eq("id", doctor.id);
    if (updateError) return { isSuccess: false, error: updateError.message };
    updateTag("doctor");
    updateTag("doctors");
    revalidatePath("/dashboard/settings");
    return { isSuccess: true, successMsg: "your data updated successfully" };
  }
  return { isSuccess: false, error: "not authorized" };
}

export async function addDefaultValues(
  _: { isSuccess: boolean; successMsg?: string; error?: string } | undefined,
  formData: FormData,
) {
  const doctor = await getDoctorUser();
  const { buffer_time, language, slot_duration } = Object.fromEntries(
    formData.entries(),
  ) as DefaultValuesForm;

  if (doctor.id) {
    const supabase = await createClient();
    const { error } = await supabase
      .from("doctors")
      .update({
        buffer_time: +buffer_time,
        slot_duration: +slot_duration,
        language: language as Database["public"]["Enums"]["language"],
      })
      .eq("id", doctor.id);

    if (error) return { isSuccess: false, error: error.message };

    updateTag("doctor");
    revalidatePath("/dashboard/settings");

    return { isSuccess: true, successMsg: "Default values save successfully" };
  }
  return { isSuccess: false, error: "not authorized" };
}
