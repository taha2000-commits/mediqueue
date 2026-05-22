import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getPaginationData } from "@/lib/utils";
import { DoctorWithStats } from "@/types/doctors";
import { ResponseType } from "@/types/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization");
  const lang = searchParams.get("lang") || "en";

  const limit = parseInt(searchParams.get("limit") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "1");
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const db = await createClient();
  const query = db.from("doctors_with_stats").select("*", { count: "exact" });

  if (specialization)
    query.eq(
      lang == "ar" ? "specialization_ar" : "specialization_en",
      specialization,
    );

  if (searchParams.get("limit")) query.range(from, to);
  const { data: doctors, error, count } = await query;

  if (error) return NextResponse.json(error, { status: 400 });
  const { next, numOfPage, prev } = getPaginationData({
    count,
    limit,
    page,
  });

  const response: ResponseType<DoctorWithStats[]> = {
    count: count ?? 0,
    next,
    numOfPage,
    prev,
    page,
    results: (doctors as DoctorWithStats[]) || [],
    from: from + 1,
    to: (count ?? 0) > limit * page ? to + 1 : (count ?? 0),
  };

  return NextResponse.json(response, {
    status: 200,
  });
}
