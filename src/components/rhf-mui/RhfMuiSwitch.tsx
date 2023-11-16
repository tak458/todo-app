import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface RhfMuiSwitchProps<TFieldValues extends FieldValues> extends Omit<SwitchProps, "id"> {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues, FieldPath<TFieldValues>>;
}

export function RhfMuiSwitch<TFieldValues extends FieldValues>(props: RhfMuiSwitchProps<TFieldValues>) {
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
