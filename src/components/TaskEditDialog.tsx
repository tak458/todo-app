import { IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import React, { FC, useCallback, useState } from "react";
import { useAppDispatch } from "../hooks/toolkit";
import { Task, tasks } from "../store/modules/tasks";
import EditIcon from "@material-ui/icons/Edit";

export interface TaskEditDialogProps {
  model: Task;
}

export const TaskEditDialog: FC<TaskEditDialogProps> = (props) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const onOpen = useCallback(() => {
    setName(props.model.name);
    setOpen(true);
  }, [props.model.name]);

  const onSubmit = useCallback(() => {
    if (name !== undefined && name !== "") {
      const model: Task = { ...props.model, name };
      dispatch(tasks.actions.update(model));
    }
    setOpen(false);
    setName("");
  }, [dispatch, name, props.model]);

  const onCancel = useCallback(() => {
    setOpen(false);
    setName("");
  }, []);

  return (
    <>
      <IconButton size="small" onClick={onOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>カテゴリの編集</DialogTitle>
        <DialogContent>
          <TextField value={name} onChange={(e) => setName(e.target.value)} label="カテゴリ名" />
        </DialogContent>
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
