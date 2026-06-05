"use server";
import { v4 as uuidV4 } from "uuid";

import { getUser } from "@/lib/auth/getUser";
import verifyDoctor from "@/lib/auth/verifyDoctor";
import { doctorsService } from "@/lib/services/doctors";
import { createClient } from "@/lib/supabase/server";

import { AddDoctorFormInputs } from "./page";

export async function saveDoctorData(
  _: { isSuccess: boolean; successMsg?: string; error?: string } | undefined,
  formData: FormData,
) {
  const fData = Object.fromEntries(
    formData.entries(),
  ) as unknown as AddDoctorFormInputs;

  const user = await getUser();

  if (user) {
    const avatar_id = uuidV4();
    const db = await createClient();
    let filePath;
    if (fData.photo.size > 0) {
      const { data: pictureUploadData, error: pictureUploadError } =
        await db.storage
          .from("doctors_images")
          .upload(`/${user.id}/${avatar_id}`, fData.photo, {
            upsert: true,
          });

      filePath = pictureUploadData?.fullPath;

      if (pictureUploadError || !filePath)
        return { isSuccess: false, error: pictureUploadError?.message };
      const xx = Object.fromEntries(
        formData.entries().filter(([key]) => key !== "photo"),
      ) as unknown as AddDoctorFormInputs;
      const { error, success } = await doctorsService.addDoctor({
        ...xx,
        avatar: filePath,
        id: user.id,
        avatar_updated_at: new Date().toISOString(),
        language: "en",
        name_en: "Dr. " + xx.name_en,
        name_ar: "د. " + xx.name_ar,
      });

      if (error) {
        return { isSuccess: false, error: error.message };
      }

      if (success) {
        const { error } = await verifyDoctor();

        if (error) {
          return { isSuccess: false, error: error.message };
        }

        return { isSuccess: success, successMsg: "Saved succesfully" };
      }
    }
  }
}
