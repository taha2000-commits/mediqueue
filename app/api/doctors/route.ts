import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/client";
import { getTranslatedObj } from "@/lib/utils";
import { Doctor } from "@/types/doctors";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization");
  const lang = searchParams.get("lang") || "en";

  const f = async (lang: "ar" | "en") => {
    const db = await createClient();
    const { data: doctors, error } = await db
      .from("doctors")
      .select("*")
      .eq(
        lang == "ar" ? "specialization_ar" : "specialization_en",
        specialization,
      )
      .then((value) => {
        return {
          ...value,
          data: value.data?.map((doc) =>
            getTranslatedObj(doc, lang),
          ) as Doctor[],
        };
      });

    if (error) return NextResponse.json(error, { status: 400 });

    return NextResponse.json(doctors, { status: 200 });
  };

  return await f(lang as "ar" | "en");
}
