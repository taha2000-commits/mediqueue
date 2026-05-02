import { dayIndices } from "@/lib/constants";

export type Period = Record<"start" | "end", string>;

export type Schedule = Record<
  (typeof dayIndices)[number],
  Record<"am" | "pm", Record<"break", Period> & Period>
>;

export enum Slot_Status {
  FREE = "free",
  BREAK = "break",
}
