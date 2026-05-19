import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const GET = async () => {
  const db = await createClient();

  const {
    data: appointments,
    error,
    status,
  } = await db
    .from("appointments")
    .select(
      `
    *,
    doctors (
    *
    )
  `,
    )
    .order("time", { ascending: true })
    .order("date", { ascending: true });

  if (error) return NextResponse.json(error, { status });

  return NextResponse.json(appointments, {
    status: 200,
  });
};
