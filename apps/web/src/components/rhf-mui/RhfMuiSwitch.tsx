import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface RhfMuiSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
> extends Omit<SwitchProps, "id"> {
  name: TName;
  label: string;
  control: Control<TFieldValues, TName, TTransformedValues>;
}

export function RhfMuiSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues,
>(props: RhfMuiSwitchProps<TFieldValues, TName, TTransformedValues>) {
  const { name, label, control, ...switchProps } = props;
  const id = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel control={<Switch {...switchProps} id={id} {...field} />} label={label} />
      )}
    />
  );
}
