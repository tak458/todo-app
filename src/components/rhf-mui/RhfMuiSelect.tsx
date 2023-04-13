import { FormControl, FormHelperText, InputLabel, Select, SelectProps } from "@mui/material";
import type { ReactNode } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface RhfMuiSelectProps<TFieldValues extends FieldValues>
  extends Omit<SelectProps, "labelId" | "label" | "id"> {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues, FieldPath<TFieldValues>>;
  children?: ReactNode;
}

export function RhfMuiSelect<TFieldValues extends FieldValues>(props: RhfMuiSelectProps<TFieldValues>) {
  const { name, label, control, children, ...selectProps } = props;
  const id = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={fieldState.invalid}>
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Select {...selectProps} labelId={`${id}-label`} label={label} id={id} {...field}>
            {children}
          </Select>
          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
