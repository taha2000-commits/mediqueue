import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data } = await supabase.from("hospital_stats").select("*").single();

  return NextResponse.json(data);
}
