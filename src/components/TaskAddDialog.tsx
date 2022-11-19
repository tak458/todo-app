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
  InputLabel,
  FormControl,
} from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import React, { FC, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../hooks/toolkit";
import { tasks } from "../store/modules/tasks";
import { Task } from "../models/Task";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./globals/ErrorFallback";
import { MarkdownEditor } from "./MarkdownEditor";
import { convertToTask, createNewTaskForm, TaskForm } from "../models/TaskForm";

export interface TaskAddDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentId: string;
}

export const TaskAddDialog: FC<TaskAddDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<TaskForm>({ defaultValues: createNewTaskForm() });

  const onSubmit: SubmitHandler<TaskForm> = useCallback(
    (data) => {
      if (data.name !== undefined && data.name !== "") {
        const model: Task = { ...convertToTask(data), id: nanoid(), children: [] };
        dispatch(tasks.actions.add({ parentId: props.parentId, model }));
      }
      props.setOpen(false);
      enqueueSnackbar("タスクを追加しました", { variant: "success" });
    },
    [dispatch, enqueueSnackbar, props]
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
            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <TextField fullWidth label="タスク名" {...field} />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="note"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel htmlFor="input-memo" shrink={true}>
                        メモ
                      </InputLabel>
                      <MarkdownEditor {...field} id="input-memo" />
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="estimatedTime"
                  control={control}
                  render={({ field }) => <TextField fullWidth label="見積時間" {...field} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="actualTime"
                  control={control}
                  render={({ field }) => <TextField fullWidth label="実績時間" {...field} />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="startedAt"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="datetime-local"
                      fullWidth
                      label="開始日時"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="finishedAt"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      type="datetime-local"
                      fullWidth
                      label="終了日時"
                      InputLabelProps={{ shrink: true }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="completedAt"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={!!field.value}
                          onChange={(event) => field.onChange(event.target.value ? undefined : new Date().getTime())}
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
