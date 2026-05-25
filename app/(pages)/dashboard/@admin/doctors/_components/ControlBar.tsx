"use client";

import CustomSelect from "@/app/components/CustomSelect";
import SearchInput from "@/app/components/SearcInput";

import DoctorStatusSelect from "./DoctorStatusSelect";

const ControlBar = ({ count }: { count: number }) => {
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
        <CustomSelect
          options={[
            { text: "Dermatology", value: "Dermatology" },
            { text: "Cardiology", value: "Cardiology" },
            { text: "Neurology", value: "Neurology" },
          ]}
          placeholder="specialization"
          use_search_params={{
            param: "specialization",
          }}
          defaultValue=""
          className="border-border bg-background min-w-xs"
        />
      </div>
      <div className="bg-secondary min-w-xs rounded-xl p-4">
        <DoctorStatusSelect className="border-border bg-background" />
      </div>
    </div>
  );
};

export default ControlBar;
