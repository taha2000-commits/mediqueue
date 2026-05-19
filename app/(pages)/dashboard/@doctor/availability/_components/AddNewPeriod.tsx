"use client";
import { Plus } from "lucide-react";
import { SubmitEventHandler, useReducer, useState } from "react";
import { toast } from "sonner";

import CustomSelect from "@/app/components/CustomSelect";
import TimePicker from "@/app/components/TimePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { updateSchedule } from "@/lib/services/update_schedule";
import { Schedule } from "@/types/doctor-schedule";

import { reducer } from "../reducer";

type IProps = {
  schedule: Schedule;
  period: "am" | "pm" | "any";
  day: number;
};

const createInitialState = (period: "am" | "pm" | "any") => ({
  bufferTime: "10",
  slotDuration: "30",
  workingHours: {
    start: "00:00:00",
    end: "00:00:00",
  },
  breakHours: {
    start: "00:00:00",
    end: "00:00:00",
  },
  periodType: period == "any" ? "am" : period,
});

const AddNewPeriod = ({ day, period, schedule }: IProps) => {
  const initState = createInitialState(period);
  const [state, dispatch] = useReducer(reducer, initState);
  const { bufferTime, slotDuration, breakHours, workingHours, periodType } =
    state;
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const body = {
    ...schedule,
    [day]: {
      ...schedule[day],
      [`${periodType}`]: {
        end: workingHours.end,
        break: breakHours,
        start: workingHours.start,
        is_active: true,
        buffer_time: bufferTime,
        slot_duration: slotDuration,
      },
    },
  };

  const onsubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error, isSuccess } = await updateSchedule(body);

    if (isSuccess) {
      setIsLoading(false);
      toast.success(data, {
        position: "top-left",
      });
      setOpen(false);
      dispatch({
        type: "RESET",
        initState: createInitialState("any"),
        payload: "",
      });
    } else {
      toast.error(error, {
        position: "top-left",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="border-border flex w-full items-center justify-center gap-2 rounded-lg border p-1 text-sm shadow"
        >
          <Plus size={18} />
          <span className="">add new period</span>
        </Button>
      </DialogTrigger>
      {open && (
        <DialogContent className="sm:max-w-sm">
          <form onSubmit={onsubmit} className="grid gap-5">
            <DialogHeader className="">
              <DialogTitle>
                add new period ({periodType.toUpperCase()})
              </DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
            </DialogHeader>
            {period === "any" && (
              <Field className="gap-1">
                <FieldLabel>period</FieldLabel>
                <CustomSelect
                  name="type"
                  defaultValue={"am"}
                  placeholder="am period"
                  options={[
                    { text: "AM", value: "am" },
                    { text: "PM", value: "pm" },
                  ]}
                  onValueChange={(val) =>
                    dispatch({ type: "SET_PERIOD_TYPE", payload: val })
                  }
                />
              </Field>
            )}
            <FieldGroup className="gap-1">
              <FieldLabel>
                working hours ({periodType.toUpperCase()})
              </FieldLabel>
              <div className="flex items-center gap-3">
                <TimePicker
                  name="workStart"
                  time={workingHours.start}
                  period={periodType}
                  onChange={(val) =>
                    dispatch({ type: "SET_WH_START", payload: val })
                  }
                  className="bg-second-background flex-1"
                />
                <span className="normal-case">to</span>
                <TimePicker
                  name="workEnd"
                  time={workingHours.end}
                  period={periodType}
                  onChange={(val) =>
                    dispatch({ type: "SET_WH_END", payload: val })
                  }
                  className="bg-second-background flex-1"
                />
              </div>
            </FieldGroup>
            <FieldGroup className="gap-1">
              <FieldLabel>break</FieldLabel>
              <div className="flex items-center gap-3">
                <TimePicker
                  name="breakStart"
                  time={breakHours.start}
                  onChange={(val) => {
                    dispatch({ type: "SET_BH_START", payload: val });
                  }}
                  min={workingHours.start}
                  max={workingHours.end}
                  period={periodType}
                  className="bg-second-background flex-1"
                />
                <span className="normal-case">to</span>
                <TimePicker
                  name="breakEnd"
                  time={breakHours.end}
                  onChange={(val) =>
                    dispatch({ type: "SET_BH_END", payload: val })
                  }
                  min={workingHours.start}
                  max={workingHours.end}
                  period={periodType}
                  className="bg-second-background flex-1"
                />
              </div>
            </FieldGroup>
            <FieldGroup className="flex flex-row">
              <Field>
                <FieldLabel>slot duration</FieldLabel>

                <CustomSelect
                  name="slot_duration"
                  defaultValue={slotDuration}
                  placeholder="30 minutes"
                  options={[
                    { text: "30", value: "30" },
                    { text: "60", value: "60" },
                  ]}
                  onValueChange={(val) =>
                    dispatch({ type: "SET_SLOT_DURATION", payload: val })
                  }
                />
              </Field>
              <Field>
                <FieldLabel>buffer time</FieldLabel>

                <CustomSelect
                  name="buffer_time"
                  defaultValue={bufferTime}
                  placeholder="10 minutes"
                  options={[
                    { text: "10", value: "10" },
                    { text: "20", value: "20" },
                    { text: "30", value: "30" },
                    { text: "40", value: "40" },
                    { text: "50", value: "50" },
                    { text: "60", value: "60" },
                  ]}
                  className=""
                  onValueChange={(val) =>
                    dispatch({ type: "SET_BUFFER_TIME", payload: val })
                  }
                />
              </Field>
            </FieldGroup>
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {isLoading && <Spinner />}
                <span>Save changes</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddNewPeriod;
