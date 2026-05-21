"use client";
import { Check, CloudCheck, InfoIcon, Moon, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import TimePicker from "@/app/components/TimePicker";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { useShowSuccessIcon } from "@/hooks/useShowSuccessIcon";
import { updateSchedule } from "@/lib/services/update_schedule";
import { cn, equal } from "@/lib/utils";
import { Period, Schedule } from "@/types/doctor-schedule";

interface IProps {
  schedule: Schedule;
  type: "am" | "pm";
  day: number;
}

function PeriodDetails({ schedule, type, day = 0 }: IProps) {
  const {
    start,
    end,
    buffer_time,
    is_active,
    slot_duration,
    break: { start: breakStart, end: breakEnd },
  } = schedule[day][type] as Period;

  const isAM = type == "am";

  const [workingHours, setWorkingHours] = useState({ start: start, end: end });
  const [breakHours, setBreakHours] = useState({
    end: breakEnd,
    start: breakStart,
  });
  const [slotDuration, setSlotDuration] = useState(slot_duration);
  const [bufferTime, setBufferTime] = useState(buffer_time);
  const [isActive, setIsActive] = useState(is_active);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { isShow, setIsShow } = useShowSuccessIcon();

  const body = {
    ...schedule,
    [day]: {
      ...schedule[day],
      [`${type}`]: {
        end: workingHours.end,
        break: breakHours,
        start: workingHours.start,
        is_active: isActive,
        buffer_time: bufferTime,
        slot_duration: slotDuration,
      },
    },
  };

  const isEqual = equal(schedule, body);

  const submit = async () => {
    setIsLoading(true);

    const { data, error, isSuccess } = await updateSchedule(body);

    if (isSuccess) {
      setIsLoading(false);
      setIsShow(true);
      toast.success(data, {
        position: "top-left",
      });
    } else {
      toast.error(error, {
        position: "top-left",
      });
    }
  };

  const deletePeriod = async () => {
    const p = isAM ? "pm" : "am";
    const body = {
      ...schedule,
      [day]: {
        [p]: schedule[day][p],
      },
    };
    setIsDeleting(true);
    const { data, error, isSuccess } = await updateSchedule(body as Schedule);
    if (isSuccess) {
      setIsDeleting(false);
      setIsShow(true);
      toast.success(data, {
        position: "top-left",
      });
    } else {
      toast.error(error, {
        position: "top-left",
      });
    }
  };
  return (
    <div className="border-border grid grid-cols-9 overflow-hidden rounded-2xl border shadow">
      <div
        className={cn(
          "dark:bg-background/20 col-span-2 flex flex-col items-center justify-center gap-2",
          isAM ? "bg-status-accepted/10" : "bg-status-completed/20",
        )}
      >
        <div
          className={cn(
            "dark:bg-background/30 rounded-full p-2",
            isAM
              ? "bg-status-accepted/10 text-status-accepted"
              : "bg-status-completed/10 text-status-completed",
          )}
        >
          <Moon size={18} />
        </div>
        <h6 className="font-bold">{isAM ? "AM period" : "PM period"}</h6>
        <span className="text-muted-foreground text-center text-xs font-semibold">
          {isAM ? "morning session" : "evening session"}
        </span>
        <Switch
          defaultChecked={isActive}
          className={cn(
            "data-checked:bg-status-accepted data-checked:border-status-accepted",
            isAM
              ? "data-unchecked:bg-status-accepted/40"
              : "data-unchecked:bg-status-completed",
          )}
          onCheckedChange={(isChecked) => {
            setIsActive(isChecked);
          }}
        />
      </div>
      <div className="col-span-4 grid gap-5 p-5">
        <FieldGroup className="gap-1">
          <FieldLabel>working hours (PM)</FieldLabel>
          <div className="flex items-center gap-3">
            <TimePicker
              time={workingHours.start}
              onChange={(val) => setWorkingHours((b) => ({ ...b, start: val }))}
              period={isAM ? "am" : "pm"}
            />
            <span className="normal-case">to</span>
            <TimePicker
              time={workingHours.end}
              onChange={(val) => setWorkingHours((b) => ({ ...b, end: val }))}
              period={isAM ? "am" : "pm"}
            />
          </div>
        </FieldGroup>
        <FieldGroup className="gap-1">
          <FieldLabel>break</FieldLabel>
          <div className="flex items-center gap-3">
            <TimePicker
              time={breakHours.start}
              onChange={(val) => setBreakHours((b) => ({ ...b, start: val }))}
              min={workingHours.start}
              max={workingHours.end}
              period={isAM ? "am" : "pm"}
            />
            <span className="normal-case">to</span>
            <TimePicker
              time={breakHours.end}
              onChange={(val) => setBreakHours((b) => ({ ...b, end: val }))}
              min={workingHours.start}
              max={workingHours.end}
              period={isAM ? "am" : "pm"}
            />
          </div>
        </FieldGroup>
        <FieldGroup className="flex flex-row">
          <Field>
            <FieldLabel>slot duration</FieldLabel>
            <Select
              defaultValue={slotDuration}
              onValueChange={(val) => setSlotDuration(val)}
            >
              <SelectTrigger className="border-ring w-full border">
                <SelectValue placeholder="30 minutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="60">60</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel>buffer time</FieldLabel>
            <Select
              defaultValue={bufferTime}
              onValueChange={(val) => setBufferTime(val)}
            >
              <SelectTrigger className="border-ring w-full border">
                <SelectValue placeholder="10 minutes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="60">60</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </div>
      <div className="col-span-3 flex flex-col justify-between p-6">
        <div className="flex justify-end gap-2">
          <Button
            size={"icon-sm"}
            variant={"outline"}
            className={cn(
              "rounded-lg",
              isShow && "bg-status-accepted/20 border-status-accepted",
            )}
            onClick={submit}
            disabled={isLoading || isEqual || (isLoading && !isShow)}
          >
            {isShow ? (
              <Check className="text-status-accepted transition-all duration-200" />
            ) : isLoading ? (
              <Spinner />
            ) : (
              <CloudCheck />
            )}
          </Button>
          <Button
            size={"icon-sm"}
            variant={"destructive"}
            className={"rounded-lg"}
            onClick={deletePeriod}
          >
            {isShow ? (
              <Check className="text-status-rejected transition-all duration-200" />
            ) : isDeleting ? (
              <Spinner />
            ) : (
              <Trash />
            )}
          </Button>
        </div>
        <Alert
          className={cn(
            "p-2",
            isAM
              ? "text-status-accepted bg-status-accepted/20 border-status-accepted"
              : "text-status-completed bg-status-completed/20 border-status-completed",
          )}
        >
          <InfoIcon className="" />
          <AlertDescription className="grid text-xs">
            slots will be created every <b>{slotDuration} minutes</b>
            with {bufferTime} minutes buffer at the end of the period
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
export default PeriodDetails;
