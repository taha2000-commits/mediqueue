"use server";
import { revalidatePath } from "next/cache";
import { updateTag } from "next/cache";

import { Schedule } from "@/types/doctor-schedule";

import { getUser } from "../auth/getUser";
import { createClient } from "../supabase/server";

export async function addNewSchedule(body: Partial<Schedule>) {
  const user = await getUser();

  if (user?.id) {
    const db = await createClient();

    const { error, success } = await db
      .from("doctor_availability")
      .insert({ doctor_id: user.id, weekly_schedule: body });

    if (error)
      return {
        isSuccess: false,
        error: error.message,
        data: "Added Failed",
      };

    updateTag("schedule");
    revalidatePath("/dashboard/availability");

    return {
      isSuccess: success,
      error: null,
      data: "Added Successfully",
    };
  }

  return {
    isSuccess: false,
    error: "not authorized",
    data: null,
  };
}
