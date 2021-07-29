import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import React, { FC, useCallback, useState } from "react";
import { useAppDispatch } from "../hooks/toolkit";
import { Task, tasks } from "../store/modules/tasks";
import DeleteIcon from "@material-ui/icons/Delete";

export interface TaskDeleteDialogProps {
  model: Task;
}

export const TaskDeleteDialog: FC<TaskDeleteDialogProps> = (props) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onSubmit = useCallback(() => {
    const model: Task = { ...props.model };
    dispatch(tasks.actions.remove(model));
    setOpen(false);
  }, [dispatch, props.model]);

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <IconButton size="small" onClick={onOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>カテゴリの削除</DialogTitle>
        <DialogContent>{props.model.name} を削除してもよろしいですか？</DialogContent>
        <DialogActions>
          <Button onClick={onSubmit} color="primary">
            OK
          </Button>
          <Button onClick={onCancel}>キャンセル</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
