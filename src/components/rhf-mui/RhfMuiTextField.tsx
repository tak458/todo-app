import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface RhfMuiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends Omit<TextFieldProps, "id" | "label" | "error" | "helperText"> {
  name: TName;
  label: string;
  control: Control<TFieldValues, TName, TTransformedValues>;
}

export function RhfMuiTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: RhfMuiSelectProps<TFieldValues, TName, TTransformedValues>) {
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
