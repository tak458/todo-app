import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface RhfMuiCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends Omit<CheckboxProps, "id"> {
  name: TName;
  label: string;
  control: Control<TFieldValues, TName, TTransformedValues>;
}

export function RhfMuiCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: RhfMuiCheckboxProps<TFieldValues, TName, TTransformedValues>) {
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
