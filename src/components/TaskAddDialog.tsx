import { useAppDispatch } from "@/hooks/toolkit";
import { TaskFormSchema, convertToTask, taskFormSchema } from "@/models/TaskForm";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { nanoid } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { tasks } from "../store/modules/tasks";
import { MarkdownEditor } from "./MarkdownEditor";
import { ErrorFallback } from "./globals/ErrorFallback";
import { RhfMuiCheckbox } from "./rhf-mui/RhfMuiCheckbox";
import { RhfMuiTextField } from "./rhf-mui/RhfMuiTextField";

export interface TaskAddDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  parentId: string;
}

export const TaskAddDialog: FC<TaskAddDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
  });

  const onSubmit: SubmitHandler<TaskFormSchema> = useCallback(
    (data) => {
      const model = { ...convertToTask(data), id: nanoid(), children: [] };
      dispatch(tasks.actions.add({ parentId: props.parentId, model }));
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
        <DialogTitle>タスクの追加</DialogTitle>
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
