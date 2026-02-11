import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Switch } from "../ui/switch";

interface FormSwitchProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
}

const FormSwitch = <T extends FieldValues>({
  name,
  control,
}: FormSwitchProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          className="cursor-pointer"
        />
      )}
    />
  );
};

export default FormSwitch;
