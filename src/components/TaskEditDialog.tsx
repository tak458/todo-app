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
  FormControl,
  InputLabel,
} from "@material-ui/core";
import React, { FC, useCallback } from "react";
import { useAppDispatch } from "../hooks/toolkit";
import { tasks } from "../store/modules/tasks";
import { Task } from "../models/Task";
import { Controller, useForm } from "react-hook-form";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./globals/ErrorFallback";
import { MarkdownEditor } from "./MarkdownEditor";
import { convertFromTask, convertToTask, TaskForm } from "../models/TaskForm";

export interface TaskEditDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  model: Task;
}

export const TaskEditDialog: FC<TaskEditDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm<TaskForm>({ defaultValues: convertFromTask(props.model) });

  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      if (data.name !== undefined && data.name !== "") {
        const model: Task = { ...convertToTask(data), id: props.model.id, children: props.model.children };
        dispatch(tasks.actions.update(model));
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
        <DialogTitle>タスクの編集</DialogTitle>
        <DialogContent>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Grid container spacing={2}>
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
