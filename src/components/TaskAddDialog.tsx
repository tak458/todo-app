import { IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import { nanoid } from "@reduxjs/toolkit";
import React, { FC, useCallback, useState } from "react";
import { useAppDispatch } from "../hooks/toolkit";
import { Task, tasks } from "../store/modules/tasks";
import AddIcon from "@material-ui/icons/Add";

export interface TaskAddDialogProps {
  parentId: string;
}

export const TaskAddDialog: FC<TaskAddDialogProps> = (props) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const onSubmit = useCallback(() => {
    if (name !== undefined && name !== "") {
      const model: Task = { name, children: [], id: nanoid() };
      dispatch(tasks.actions.add({ parentId: props.parentId, model }));
    }
    setOpen(false);
    setName("");
  }, [dispatch, name, props.parentId]);

  const onCancel = useCallback(() => {
    setOpen(false);
    setName("");
  }, []);

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>カテゴリの追加</DialogTitle>
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
