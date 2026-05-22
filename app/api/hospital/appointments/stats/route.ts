import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const specialization = searchParams.get("specialization");
  const supabase = await createClient();

  const { data } = await supabase.rpc("get_specialization_appointments_stats", {
    p_specialization: specialization ?? undefined,
  });

  return NextResponse.json(data);
}
