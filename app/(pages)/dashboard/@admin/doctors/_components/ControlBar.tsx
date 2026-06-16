"use client";
import { Search } from "lucide-react";

import SearchInput from "@/app/components/SearcInput";
import SpecializationSelect from "@/app/components/SpecializationSelect";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { specializations } from "@/lib/constants";

import ActiveFiltersPopover from "./ActiveFiltersPopover";
import DoctorStatusSelect from "./DoctorStatusSelect";

const ControlBar = ({
  count,
  specializationOptions,
}: {
  count: number;
  specializationOptions?: {
    value: string;
    text: string;
    count: number;
  }[];
}) => {
  const opts =
    specializationOptions ??
    specializations.map((sp) => ({ text: sp.en, value: sp.en, count: 0 }));

  return (
    <div className="space-y-4">
      <div className="flex w-fit items-center gap-4">
        <SpecializationSelect
          options={opts}
          className="border-border bg-secondary outline-background outline-4 outline-solid"
          defaultValue=""
        />
        <DoctorStatusSelect className="border-border bg-secondary outline-background outline-4 outline-solid" />
      </div>
      <div className="flex w-full justify-end gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size={"icon-lg"}>
              <Search />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit gap-1">
            <p className="text-sm capitalize">search using name</p>
            <SearchInput count={count} className="border-border bg-secondary" />
          </PopoverContent>
        </Popover>
        <ActiveFiltersPopover />
      </div>
    </div>
  );
};

export default ControlBar;
