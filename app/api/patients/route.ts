import { isBefore } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getNumbersBtwTwoNums, getPaginationData } from "@/lib/utils";
import { BloodGroup, PatientWithAppointments } from "@/types/patients";
import { ResponseType } from "@/types/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const doctor_id = searchParams.get("doctor_id");

  const sortParam = searchParams.get("sort");

  const type = (searchParams.get("type") ?? "all") as
    | "returning"
    | "new"
    | "active"
    | "all";

  const gender = searchParams.get("gender");
  const dateRange = searchParams.get("date_range");
  const statusParam = searchParams.get("status");
  const age_group = searchParams.get("age_group");
  const bloodGroup = searchParams.get("blood_group") as BloodGroup;
  const searchText = searchParams.get("search");
  const today = searchParams.get("today");
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "1");

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = await createClient();

  const query = supabase
    .rpc(
      "get_patients_with_appointments",
      {
        doctor_uuid: doctor_id ?? undefined,
      },
      { count: "exact" },
    )
    .select("*");

  if (today) query.eq("has_appointment_today", true);

  if (dateRange) {
    const [start, end] = dateRange
      .split(",")
      .sort((a, b) => (isBefore(a, b) ? -1 : 1));

    query.gte("created_at", start);
    query.lte("created_at", end);
  }
  if (sortParam) {
    const [column, order] = sortParam.split(".");
    query.order(column, {
      ascending: order === "asc",
    });
  }

  if (gender == "male" || gender == "female") query.eq("gender", gender);

  if (age_group && age_group !== "all" && !age_group.includes("+"))
    query.in(
      "age",
      getNumbersBtwTwoNums(+age_group.split("-")[0], +age_group.split("-")[1]),
    );

  if (age_group?.includes("+"))
    query.gte("age", age_group?.split("+").join(""));

  if (bloodGroup) query.eq("blood_group", bloodGroup);

  if (statusParam) query.eq("active", statusParam == "active");

  if (type == "active") query.eq("active", true);

  if (type == "new" || type == "returning") query.eq("type", type);

  if (searchText) query.ilike("name", `%${searchText}%`);

  if (searchParams.get("limit")) query.range(from, to);

  const { data, error, status, count } = await query;
  console.log("ddd", count);

  if (error) return NextResponse.json(error.message, { status });

  const { next, numOfPage, prev } = getPaginationData({
    count,
    limit,
    page,
  });

  const response: ResponseType<PatientWithAppointments[]> = {
    count: count ?? 0,
    next,
    numOfPage,
    prev,
    page,
    from: from + 1,
    to: (count ?? 0) > limit * page ? to + 1 : (count ?? 0),
    results: (data || []) as PatientWithAppointments[],
  };

  return NextResponse.json(response, { status: status });
}
