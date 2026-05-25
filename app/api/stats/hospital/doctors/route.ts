import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const db = await createClient();
  const { data, error } = await db.from("doctors_stats").select("*").single();
  if (error) return NextResponse.json(error, { status: 400 });
  return NextResponse.json(data, { status: 200 });
}
