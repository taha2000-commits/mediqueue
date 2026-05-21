export type Period = {
  buffer_time: string;
  slot_duration: string;
  is_active: boolean;
  start: string;
  end: string;
  break: Omit<Period, "break" | "buffer_time" | "slot_duration" | "is_active">;
};

export type Schedule = Record<number, { am: Period; pm: Period }>;

export enum Slot_Status {
  FREE = "free",
  BREAK = "break",
}
