import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { useSnackbar } from "notistack";
import { useAppDispatch } from "../hooks/toolkit";
import { tasks } from "../store/modules/tasks";
import { Task } from "../models/Task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./globals/ErrorFallback";
import { MarkdownEditor } from "./MarkdownEditor";
import { TaskFormSchema, convertFromTask, convertToTask, taskFormSchema } from "../models/TaskForm";
import { RhfMuiTextField } from "./rhf-mui/RhfMuiTextField";
import { RhfMuiCheckbox } from "./rhf-mui/RhfMuiCheckbox";

export interface TaskEditDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  model: Task;
}

export const TaskEditDialog: FC<TaskEditDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskFormSchema.parse(convertFromTask(props.model)),
  });

  const onSubmit: SubmitHandler<TaskFormSchema> = useCallback(
    (data) => {
      const model = { ...convertToTask(data), id: props.model.id, children: props.model.children };
      dispatch(tasks.actions.update(model));
      props.setOpen(false);
      enqueueSnackbar("タスクを追加しました", { variant: "success" });
    },
    [dispatch, enqueueSnackbar, props],
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
            <Grid container spacing={2} marginTop={1}>
              <Grid item xs={12}>
                <RhfMuiTextField name="name" label="タスク名" control={control} fullWidth />
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
                <RhfMuiTextField name="estimatedTime" label="見積時間" control={control} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RhfMuiTextField name="actualTime" label="実績時間" control={control} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RhfMuiTextField
                  name="startedAt"
                  control={control}
                  type="datetime-local"
                  fullWidth
                  label="開始日時"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RhfMuiTextField
                  name="finishedAt"
                  control={control}
                  type="datetime-local"
                  fullWidth
                  label="終了日時"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <RhfMuiCheckbox name="completedAt" label="完了" control={control} />
              </Grid>
            </Grid>
          </ErrorBoundary>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" variant="contained">
            OK
          </Button>
          <Button onClick={onCancel} variant="outlined">
            キャンセル
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
