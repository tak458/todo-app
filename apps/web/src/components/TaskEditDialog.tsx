import { MarkdownEditor } from "@/components/MarkdownEditor";
import { ErrorFallback } from "@/components/globals/ErrorFallback";
import { RhfMuiCheckbox } from "@/components/rhf-mui/RhfMuiCheckbox";
import { RhfMuiTextField } from "@/components/rhf-mui/RhfMuiTextField";
import { useAppDispatch } from "@/hooks/toolkit";
import { Task } from "@/models/Task";
import { TaskFormSchema, convertFromTask, convertToTask, taskFormSchema } from "@/models/TaskForm";
import { tasks } from "@/store/modules/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export interface TaskEditDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  model: Task;
}

export const TaskEditDialog: FC<TaskEditDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { control, handleSubmit } = useForm<
    z.input<typeof taskFormSchema>,
    keyof z.infer<typeof taskFormSchema>,
    z.output<typeof taskFormSchema>
  >({
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
              <Grid size={12}>
                <RhfMuiTextField name="name" label="タスク名" control={control} fullWidth />
              </Grid>
              <Grid size={12}>
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
              <Grid size={{ xs: 12, sm: 6 }}>
                <RhfMuiTextField name="estimatedTime" label="見積時間" control={control} fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <RhfMuiTextField name="actualTime" label="実績時間" control={control} fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <RhfMuiTextField
                  name="startedAt"
                  control={control}
                  type="datetime-local"
                  fullWidth
                  label="開始日時"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <RhfMuiTextField
                  name="finishedAt"
                  control={control}
                  type="datetime-local"
                  fullWidth
                  label="終了日時"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid size={12}>
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
