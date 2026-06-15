"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { useHandleSearchParams } from "@/hooks/useHandleSearchParams";

export function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  });

  const { urlSearchParams } = useHandleSearchParams();

  const [isPending, startTransition] = React.useTransition();
  const onDone = () => {
    startTransition(() => {
      if (date?.from && date.to) {
        const value = `${format(date.from, "yyyy-MM-dd")},${format(date.to, "yyyy-MM-dd")}`;
        urlSearchParams.set("date_range", value);
      }
    });
  };
  return (
    <Field className="mx-auto w-xs">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex">
            <Button
              variant="outline"
              id="date-picker-range"
              className="flex-1 justify-start rounded-e-none px-2.5 font-normal"
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
            <Button className="rounded-s-none text-sm" onClick={onDone}>
              Done {isPending ? <Spinner /> : null}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
