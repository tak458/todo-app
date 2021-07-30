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
import React, { FC, useCallback, useState } from "react";
import { useAppDispatch } from "../hooks/toolkit";
import { Task, tasks } from "../store/modules/tasks";
import { Controller, useForm } from "react-hook-form";
import { AddButton } from "./buttons/AddButton";

export interface TaskAddDialogProps {
  parentId: string;
}

export const TaskAddDialog: FC<TaskAddDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);

  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      if (data.name !== undefined && data.name !== "") {
        const model: Task = { ...data, children: [], id: nanoid() };
        dispatch(tasks.actions.add({ parentId: props.parentId, model }));
      }
      setOpen(false);
    },
    [dispatch, props.parentId]
  );

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <AddButton size="small" onClick={() => setOpen(true)} />
      <Dialog open={open} onClose={onCancel}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>カテゴリの追加</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} fullWidth label="カテゴリ名" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="note"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} fullWidth multiline label="メモ" variant="outlined" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="estimatedTime"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} fullWidth label="見積時間" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="actualTime"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <TextField {...field} fullWidth label="実績時間" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="startedAt"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      type="datetime-local"
                      {...field}
                      fullWidth
                      label="開始日時"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="finishedAt"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      type="datetime-local"
                      {...field}
                      fullWidth
                      label="終了日時"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="completedAt"
                  control={control}
                  defaultValue=""
                  render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="完了" />}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              OK
            </Button>
            <Button onClick={onCancel}>キャンセル</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
