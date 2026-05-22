import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data } = await supabase
    .rpc("get_last_week_appointments_stats")
    .select("*");

  return NextResponse.json(data);
}
