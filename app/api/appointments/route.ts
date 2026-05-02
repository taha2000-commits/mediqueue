import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/client";

export const GET = async () => {
  const db = await createClient();

  const {
    data: appointments,
    error,
    status,
  } = await db.from("appointments").select(`
    *,
    doctors (
      id,
    )
  `);

  if (error) return NextResponse.json(error, { status });

  return NextResponse.json(appointments, {
    status: 200,
  });
};
