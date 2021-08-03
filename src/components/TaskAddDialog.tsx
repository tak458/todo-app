import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { nanoid } from "@reduxjs/toolkit";
import React, { FC, useCallback } from "react";
import { useAppDispatch } from "../hooks/toolkit";
import { Task, tasks } from "../store/modules/tasks";
import { Controller, useForm } from "react-hook-form";
import { format, parse } from "date-fns";
import { DateTimePattern } from "../models/constants";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./globals/ErrorFallback";

export interface TaskAddDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentId: string;
}

export const TaskAddDialog: FC<TaskAddDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<Omit<Task, "children">>();

  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      if (data.name !== undefined && data.name !== "") {
        const model: Task = { ...data, children: [], id: nanoid() };
        dispatch(tasks.actions.add({ parentId: props.parentId, model }));
      }
      props.setOpen(false);
    },
    [dispatch, props]
  );

  const onCancel = useCallback(() => {
    props.setOpen(false);
  }, [props]);

  return (
    <Dialog open={props.open} onClose={onCancel}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>タスクの追加</DialogTitle>
        <DialogContent>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField fullWidth label="タスク名" {...field} />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="note"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField fullWidth multiline label="メモ" variant="outlined" {...field} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="estimatedTime"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="見積時間"
                      {...field}
                      value={field.value.toString()}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="actualTime"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="実績時間"
                      {...field}
                      value={field.value.toString()}
                      onChange={(event) => field.onChange(event.target.value)}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="startedAt"
                  control={control}
                  defaultValue={new Date().getTime()}
                  render={({ field }) => (
                    <TextField
                      type="datetime-local"
                      fullWidth
                      label="開始日時"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      value={format(field.value, DateTimePattern)}
                      onChange={(event) => field.onChange(parse(event.target.value, DateTimePattern, new Date()))}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="finishedAt"
                  control={control}
                  defaultValue={new Date().getTime()}
                  render={({ field }) => (
                    <TextField
                      type="datetime-local"
                      fullWidth
                      label="終了日時"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                      value={format(field.value, DateTimePattern)}
                      onChange={(event) => field.onChange(parse(event.target.value, DateTimePattern, new Date()))}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="completedAt"
                  control={control}
                  defaultValue={undefined}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={!!field.value}
                          onChange={(event) => field.onChange(event.target.value)}
                        />
                      }
                      label="完了"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </ErrorBoundary>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            OK
          </Button>
          <Button onClick={onCancel}>キャンセル</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
