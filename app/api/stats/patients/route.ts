import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctor_id = searchParams.get("doctor_id");
  const period = searchParams.get("period");
  const db = await createClient();
  const { data, error, status } = await db
    .rpc("get_patients_stats", {
      doctor_uuid: doctor_id ?? undefined,
      period: period ?? undefined,
    })
    .maybeSingle();

  if (error) return NextResponse.json(error.message, { status });
  return NextResponse.json(data, { status: 200 });
}
