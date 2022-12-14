import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { useSnackbar } from "notistack";
import { ErrorBoundary } from "react-error-boundary";
import { useAppDispatch } from "../hooks/toolkit";
import { tasks } from "../store/modules/tasks";
import { Task } from "../models/Task";
import { ErrorFallback } from "./globals/ErrorFallback";

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
      <DialogTitle>タスクの削除</DialogTitle>
      <DialogContent>
        <ErrorBoundary FallbackComponent={ErrorFallback}>{props.model.name} を削除してもよろしいですか？</ErrorBoundary>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} color="primary">
          OK
        </Button>
        <Button onClick={onCancel}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
};
