import { PropsWithChildren, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAddAppointmentNotes from "@/hooks/useAddAppointmentNotes";
import { AppointmentWithPriority } from "@/types/appointments";

const AddAppNotesDialog = ({
  req,
  children,
}: { req: AppointmentWithPriority } & PropsWithChildren) => {
  const { mutate, isPending } = useAddAppointmentNotes();
  const [open, setOpen] = useState(false);
  const [medication, setMedication] = useState("");
  const [condition, setCondition] = useState("");
  const [allergy, setAllergy] = useState("");
  const [note, setNote] = useState<string>(req?.notes ?? "");

  const [medications, setMedications] = useState<string[]>(
    req?.patient?.medications ?? [],
  );
  const [conditions, setConditions] = useState<string[]>(
    req?.patient?.conditions ?? [],
  );
  const [allergies, setAllergies] = useState<string[]>(
    req?.patient?.allergies ?? [],
  );

  const addItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    clear: () => void,
  ) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    setter((prev) => {
      if (prev.includes(trimmed)) return prev;
      return [...prev, trimmed];
    });

    clear();
  };

  const removeItem = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => prev.filter((item) => item !== value));
  };

  const handleFinish = async () => {
    mutate({
      patient_id: req.patient.id,
      conditions,
      medications,
      allergies,
      appointment_id: req.id,
      notes: note,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="min-w-sm" aria-describedby={undefined}>
        <DialogTitle>Finish Appointment</DialogTitle>

        <Field>
          <FieldLabel>Medications</FieldLabel>

          <div className="flex gap-2">
            <Input
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="Add medication"
            />

            <Button
              type="button"
              onClick={() =>
                addItem(medication, setMedications, () => setMedication(""))
              }
            >
              Add
            </Button>
          </div>

          {!!medications.length && (
            <div className="mt-1 flex flex-wrap gap-2">
              {medications.map((item, i) => (
                <Item
                  key={i}
                  item={item}
                  onClick={() => removeItem(item, setMedications)}
                />
              ))}
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel>Conditions</FieldLabel>

          <div className="flex gap-2">
            <Input
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Add condition"
            />

            <Button
              type="button"
              onClick={() =>
                addItem(condition, setConditions, () => setCondition(""))
              }
            >
              Add
            </Button>
          </div>

          {!!conditions.length && (
            <div className="mt-2 flex flex-wrap gap-2">
              {conditions.map((item, i) => (
                <Item
                  key={i}
                  item={item}
                  onClick={() => removeItem(item, setConditions)}
                />
              ))}
            </div>
          )}
        </Field>

        <Field>
          <FieldLabel>Allergies</FieldLabel>

          <div className="flex gap-2">
            <Input
              value={allergy}
              onChange={(e) => setAllergy(e.target.value)}
              placeholder="Add allergy"
            />

            <Button
              type="button"
              onClick={() =>
                addItem(allergy, setAllergies, () => setAllergy(""))
              }
            >
              Add
            </Button>
          </div>

          {!!allergies.length && (
            <div className="mt-2 flex flex-wrap gap-2">
              {allergies.map((item, i) => (
                <Item
                  key={i}
                  item={item}
                  onClick={() => removeItem(item, setAllergies)}
                />
              ))}
            </div>
          )}
        </Field>
        <Field>
          <FieldLabel>Note</FieldLabel>

          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write appointment notes..."
            className="min-h-28 resize-none"
          />
        </Field>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <Button onClick={handleFinish} disabled={isPending}>
            {isPending ? "Finishing..." : "Finish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
interface ItemProps {
  item: string;
  onClick?(): void;
}

function Item({ item, onClick }: ItemProps) {
  return (
    <button
      key={item}
      type="button"
      onClick={onClick}
      className="bg-second-background rounded-md px-2 py-1 text-sm"
    >
      {item} ×
    </button>
  );
}

export default AddAppNotesDialog;
