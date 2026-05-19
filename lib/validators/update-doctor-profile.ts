import { z } from "zod";

import { specializations } from "../constants";

export const doctor_profile_schema = z
  .object({
    full_name: z.string().min(1, "name is required"),
    full_name_ar: z.string().min(1, "name is required"),
    specialization_ar: z.string().min(1, "specialization_ar is required"),
    specialization: z.string().min(1, "specialization is required"),
    email: z.email("invalidEmailFormat").min(1, "email invalid"),
    phone: z.string().min(11, "phoneInvalid"),
    photo: z
      .custom<File | undefined>((file) => {
        console.log("file", file);

        if ((file as File).size == 0) return true;
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        return validTypes.includes((file as File).type);
      }, "Only JPG, PNG, and WEBP images are allowed")
      .refine(
        (file) => {
          if (!file || (file as File).size == 0) return true;

          return file.size <= 2 * 1024 * 1024;
        },
        {
          message: "Image must be less than 2MB",
        },
      ),
  })
  .refine(
    (data) => {
      const ar_specialization = specializations.find((sp) =>
        sp["en"].includes(data.specialization),
      )?.["ar"];
      return ar_specialization === data.specialization_ar;
    },
    { error: "specializations not match", path: ["specialization_ar"] },
  );
