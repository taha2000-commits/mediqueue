import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization");
  const period = searchParams.get("period");

  const db = await createClient();

  const { data } = await db.rpc("get_specialization_appointments_stats", {
    p_specialization: specialization ?? undefined,
    p_period: period ?? undefined,
  });

  return NextResponse.json(data);
}
