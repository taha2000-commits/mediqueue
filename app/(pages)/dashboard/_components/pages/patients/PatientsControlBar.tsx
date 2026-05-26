import CustomSelect from "@/app/components/CustomSelect";
import { DatePickerWithRange } from "@/app/components/DatePickerWithRange";
import SearchInput from "@/app/components/SearcInput";
import { bloodGroup } from "@/lib/constants";
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
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-background flex items-center rounded-xl p-4 inset-shadow-xs">
          <CustomSelect
            options={ageGroupOptions}
            placeholder="Age Group"
            use_search_params={{ param: "age_group" }}
            className="border-border bg-secondary"
          />
        </div>
        <div className="bg-background flex items-center rounded-xl p-4 inset-shadow-xs">
          <CustomSelect
            options={[
              { text: "Male", value: "male" },
              { text: "Female", value: "female" },
            ]}
            placeholder="Gender"
            use_search_params={{ param: "gender" }}
            className="border-border bg-secondary"
          />
        </div>
        <div className="bg-background flex items-center rounded-xl p-4 inset-shadow-xs">
          <CustomSelect
            options={[
              { text: "Active", value: "active" },
              { text: "Inactive", value: "inactive" },
            ]}
            placeholder="Status"
            use_search_params={{ param: "status" }}
            className="border-border bg-secondary"
          />
        </div>
        <div className="bg-background flex items-center rounded-xl p-4 inset-shadow-xs">
          <CustomSelect
            options={bloodGroup.map((bg) => ({ text: bg, value: bg }))}
            placeholder="Blood Group"
            use_search_params={{ param: "blood_group" }}
            className="border-border bg-secondary"
          />
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-end gap-4">
        <div className="bg-background flex flex-col justify-center rounded-xl p-4 inset-shadow-xs">
          <p className="mb-1 text-sm capitalize">search using name</p>
          <SearchInput count={count} className="border-border bg-secondary" />
        </div>
        <div className="bg-background flex flex-col justify-center rounded-xl p-4 inset-shadow-xs">
          <p className="mb-1 text-sm">Registered from</p>
          <DatePickerWithRange />
        </div>
      </div>
    </div>
  );
};

export default PatientsControlBar;
