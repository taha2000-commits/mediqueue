"use client";

import SearchInput from "@/app/components/SearcInput";
import SpecializationSelect from "@/app/components/SpecializationSelect";
import { specializations } from "@/lib/constants";

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
    <div className="flex w-full gap-4">
      <div className="bg-secondary rounded-xl p-4">
        <SearchInput
          count={count}
          placeholder="search using name"
          className="border-border bg-background"
        />
      </div>
      <div className="bg-secondary rounded-xl p-4">
        <SpecializationSelect
          options={opts}
          className="border-border bg-background min-w-xs"
          defaultValue=""
        />
      </div>
      <div className="bg-secondary min-w-xs rounded-xl p-4">
        <DoctorStatusSelect className="border-border bg-background" />
      </div>
    </div>
  );
};

export default ControlBar;
