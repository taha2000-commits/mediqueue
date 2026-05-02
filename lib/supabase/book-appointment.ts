"use server";
import { createClient } from "./client";

export const bookAppointment = async (body: {
  [k: string]: FormDataEntryValue;
}) => {
  const db = await createClient();
  return await db.from("appointments").insert([body]).select();
};
