import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface RhfMuiCheckboxProps<TFieldValues extends FieldValues> extends Omit<CheckboxProps, "id"> {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues, unknown, TFieldValues>;
}

export function RhfMuiCheckbox<TFieldValues extends FieldValues>(props: RhfMuiCheckboxProps<TFieldValues>) {
  const { name, label, control, ...checkboxProps } = props;
  const id = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<Checkbox {...checkboxProps} id={id} checked={!!field.value} {...field} />}
        />
      )}
    />
  );
}
