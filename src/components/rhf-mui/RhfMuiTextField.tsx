import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface RhfMuiSelectProps<TFieldValues extends FieldValues>
  extends Omit<TextFieldProps, "id" | "label" | "error" | "helperText"> {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues, unknown, TFieldValues>;
}

export function RhfMuiTextField<TFieldValues extends FieldValues>(props: RhfMuiSelectProps<TFieldValues>) {
  const { name, label, control, ...textFieldProps } = props;
  const id = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...textFieldProps}
          id={id}
          label={label}
          {...field}
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
