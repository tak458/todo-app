import { ErrorFallback } from "@/components/globals/ErrorFallback";
import { useAppDispatch } from "@/hooks/toolkit";
import { Task } from "@/models/Task";
import { tasks } from "@/store/modules/tasks";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";

export interface TaskDeleteDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  model: Task;
}

export const TaskDeleteDialog: FC<TaskDeleteDialogProps> = (props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = useCallback(() => {
    const model: Task = { ...props.model };
    dispatch(tasks.actions.remove(model));
    props.setOpen(false);
    enqueueSnackbar("タスクを削除しました", { variant: "success" });
  }, [dispatch, enqueueSnackbar, props]);

  const onCancel = useCallback(() => {
    props.setOpen(false);
  }, [props]);

  return (
    <Dialog open={props.open} onClose={onCancel}>
      <form onSubmit={onSubmit}>
        <DialogTitle>タスクの削除</DialogTitle>
        <DialogContent>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {props.model.name} を削除してもよろしいですか？
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
