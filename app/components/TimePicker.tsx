"use client";
import { Clock8 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type IProps = {
  time: string;
  onChange: (val: string, period: "am" | "pm") => void;
  min?: string;
  max?: string;
  period: "am" | "pm";
  name?: string;
  className?: string;
};

const hours = Array.from({ length: 12 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

const minutes = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0"),
);

function get12HourParts(value: string) {
  const [h, m] = value.split(":");

  const hour24 = Number(h);

  const hour12 =
    hour24 === 0 ? "0" : hour24 > 12 ? String(hour24 - 12) : String(hour24);

  return {
    hour: hour12.padStart(2, "0"),
    minute: m.padStart(2, "0"),
    sec: "00",
  };
}

export default function TimePicker({
  time,
  onChange,
  max = "12:00",
  min = "00:00",
  period = "am",
  name = "",
  className,
}: IProps) {
  const [periodType, setPeriodType] = useState(period);
  const isPM = period === "pm";

  const current = isPM ? get12HourParts(time) : get12HourParts(time);

  const minTime = isPM ? get12HourParts(min) : get12HourParts(min);

  const maxTime = isPM ? get12HourParts(max) : get12HourParts(max);

  const { hour, minute, sec } = current;

  const minHour = minTime.hour;
  const maxHour = maxTime.hour;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className={cn("bg-background", className)}>
          <span className="">
            {hour}:{minute}:{sec} {period.toUpperCase()}
          </span>
          <Clock8 className="text-muted-foreground animate-spin-slow" />
          <input
            name={name}
            type="text"
            readOnly
            value={time}
            className="hidden"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background w-fit rounded-3xl border p-4 shadow-xl">
        <PopoverHeader>
          <PopoverTitle>Select Time</PopoverTitle>
          <PopoverDescription></PopoverDescription>
        </PopoverHeader>

        <div className="flex items-center gap-3">
          <div className="bg-second-background scrollbar h-56 overflow-y-auto rounded-2xl p-2">
            {hours.map((h) => (
              <button
                key={h}
                onClick={() => {
                  onChange(`${h}:${minute}:${sec}`, periodType);
                }}
                disabled={+h < +minHour || +h > +maxHour}
                className={cn(
                  `disabled:text-muted-foreground block w-16 rounded-xl py-2 text-center transition`,
                  hour === h
                    ? "bg-background text-foreground"
                    : "hover:bg-background",
                )}
              >
                {h}
              </button>
            ))}
          </div>
          <div className="text-3xl font-bold">:</div>
          <div className="bg-second-background scrollbar h-56 overflow-y-auto rounded-2xl p-2">
            {minutes.map((m) => (
              <button
                key={m}
                onClick={() => {
                  onChange(`${hour}:${m}:${sec}`, periodType);
                }}
                className={cn(
                  `disabled:text-muted-foreground block w-16 rounded-xl py-2 text-center transition`,
                  minute === m
                    ? "bg-background text-foreground"
                    : "hover:bg-background",
                )}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {["AM", "PM"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriodType(p as "am" | "pm")}
                disabled
                className={`rounded-2xl px-4 py-3 transition ${
                  period.toUpperCase() === p
                    ? "bg-background text-foreground"
                    : "bg-second-background hover:bg-background"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-second-background mt-1 rounded-2xl p-2 text-center text-xl font-bold">
          {time} {period.toUpperCase()}
        </div>
      </PopoverContent>
    </Popover>
  );
}
