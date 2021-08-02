import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import React, { FC, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAppDispatch } from "../hooks/toolkit";
import { Task, tasks } from "../store/modules/tasks";
import { ErrorFallback } from "./globals/ErrorFallback";

export interface TaskDeleteDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  model: Task;
}

export const TaskDeleteDialog: FC<TaskDeleteDialogProps> = (props) => {
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(() => {
    const model: Task = { ...props.model };
    dispatch(tasks.actions.remove(model));
    props.setOpen(false);
  }, [dispatch, props]);

  const onCancel = useCallback(() => {
    props.setOpen(false);
  }, [props]);

  return (
    <Dialog open={props.open} onClose={onCancel}>
      <DialogTitle>カテゴリの削除</DialogTitle>
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
