import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectProps } from "@mui/material/Select";
import type { ReactNode } from "react";
import { Control, FieldPath, FieldValues, PathValue, useController } from "react-hook-form";

export interface RhfMuiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends Omit<SelectProps, "labelId" | "label" | "id"> {
  name: TName;
  label: string;
  control: Control<TFieldValues, TName, TTransformedValues>;
  children?: ReactNode;
}

export function RhfMuiSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: RhfMuiSelectProps<TFieldValues, TName, TTransformedValues>) {
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
