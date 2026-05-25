import CustomSelect from "@/app/components/CustomSelect";

const DoctorStatusSelect = ({
  className,
}: {
  defaultValue?: string;
  use_search_params?: boolean;
  lang?: "ar" | "en";
  disabled?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}) => {
  return (
    <CustomSelect
      placeholder="status"
      options={[
        { text: "active", value: "active" },
        { text: "inactive", value: "inactive" },
      ]}
      defaultValue=""
      className={className}
      use_search_params={{ param: "status" }}
    />
  );
};

export default DoctorStatusSelect;
