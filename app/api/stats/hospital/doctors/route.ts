import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get("period");
  const db = await createClient();
  const { data, error } = await db
    .rpc("get_doctors_stats", { p_period: period ?? undefined })
    .select("*")
    .single();
  if (error) return NextResponse.json(error, { status: 400 });
  return NextResponse.json(data, { status: 200 });
}
