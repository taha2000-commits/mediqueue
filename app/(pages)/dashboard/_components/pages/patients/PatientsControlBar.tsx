import { Calendar, Search } from "lucide-react";

import CustomSelect from "@/app/components/CustomSelect";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import SearchInput from "@/app/components/SearcInput";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { bloodGroup } from "@/lib/constants";

import ActiveFiltersPopover from "../../../@admin/doctors/_components/ActiveFiltersPopover";
import { RefreshButton } from "../../../@doctor/requests/_components/RefreshButton";

const ageGroupOptions = [
  { text: "All Ages", value: "all" },
  { text: "Infants (0-1)", value: "0-1" },
  { text: "Toddlers (2-4)", value: "2-4" },
  { text: "Children (5-12)", value: "5-12" },
  { text: "Teenagers (13-17)", value: "13-17" },
  { text: "Young Adults (18-24)", value: "18-24" },
  { text: "Adults (25-39)", value: "25-39" },
  { text: "Middle Aged (40-59)", value: "40-59" },
  { text: "Seniors (60+)", value: "60+" },
];

const PatientsControlBar = ({ count }: { count: number }) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
        <CustomSelect
          options={ageGroupOptions}
          placeholder="Age Group"
          use_search_params={{ param: "age_group" }}
          className="border-border bg-secondary outline-background outline-4 outline-solid"
        />

        <CustomSelect
          options={[
            { text: "Male", value: "male" },
            { text: "Female", value: "female" },
          ]}
          placeholder="Gender"
          use_search_params={{ param: "gender" }}
          className="border-border bg-secondary outline-background outline-4 outline-solid"
        />

        <CustomSelect
          options={[
            { text: "Active", value: "active" },
            { text: "Inactive", value: "inactive" },
          ]}
          placeholder="Status"
          use_search_params={{ param: "status" }}
          className="border-border bg-secondary outline-background outline-4 outline-solid"
        />

        <CustomSelect
          options={bloodGroup.map((bg) => ({ text: bg, value: bg }))}
          placeholder="Blood Group"
          use_search_params={{ param: "blood_group" }}
          className="border-border bg-secondary outline-background outline-4 outline-solid"
        />
      </div>
      <div className="flex w-full justify-end gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size={"icon-lg"}>
              <Calendar />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit gap-1">
            <p className="text-sm">Registered from</p>
            <DatePickerWithRange />
          </PopoverContent>
        </Popover>
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
        <RefreshButton variant="icon" className="size-10" />
      </div>
    </div>
  );
};

export default PatientsControlBar;
