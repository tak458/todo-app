import { FormControl, FormHelperText, InputLabel, Select, SelectProps } from "@mui/material";
import type { ReactNode } from "react";
import { Control, FieldPath, FieldValues, PathValue, useController } from "react-hook-form";

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

  const {
    field: { onChange, ...otherField },
    fieldState,
  } = useController({ name, control });

  return (
    <FormControl fullWidth error={fieldState.invalid}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        {...selectProps}
        labelId={`${id}-label`}
        label={label}
        id={id}
        // refs https://github.com/orgs/react-hook-form/discussions/10605
        // 型定義の精度があがったためエラーになったので、今は型を上書きする work around
        onChange={(e) => onChange(e as PathValue<TFieldValues, FieldPath<TFieldValues>>)}
        {...otherField}
      >
        {children}
      </Select>
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
