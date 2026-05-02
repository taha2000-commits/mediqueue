import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/client";
import { getTranslatedObj } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization");
  const lang = searchParams.get("lang") || "en";

  const db = await createClient();
  const query = db.from("doctors").select("*");

  if (specialization)
    query.eq(
      lang == "ar" ? "specialization_ar" : "specialization_en",
      specialization,
    );

  const { data: doctors, error } = await query;

  if (error) return NextResponse.json(error, { status: 400 });

  return NextResponse.json(
    doctors.map((d) => getTranslatedObj(d, lang)),
    { status: 200 },
  );
}
