import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
} from "@mui/material";
import React, { useState, VFC } from "react";
import UploadIcon from "@mui/icons-material/ArrowDownward";
import { useCallback } from "react";
import { tasks } from "../store/modules/tasks";
import { Task } from "../models/Task";
import { useAppDispatch } from "../hooks/toolkit";

export const DataImport: VFC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [isRemoveAll, setIsRemoveAll] = useState(false);

  const onDrop = useCallback((e) => {
    setFiles(e.target.files ? e.target.files : e.dataTransfer.files);
  }, []);

  const onImport = useCallback(() => {
    const reader = new FileReader();
    reader.onload = () => {
      const taskTree: Task = JSON.parse(reader.result as string);

      if (isRemoveAll) {
        dispatch(tasks.actions.removeAll());
      }

      // root が先頭の場合は子のみインポート
      if (taskTree.id === "root") {
        taskTree.children.map((task) => dispatch(tasks.actions.add({ model: task })));
      } else {
        dispatch(tasks.actions.add({ model: taskTree }));
      }
    };
    Array.from(files).forEach((file) => {
      reader.readAsText(file);
    });

    setFiles([]);
    setIsRemoveAll(false);
    setOpen(false);
  }, [dispatch, files, isRemoveAll]);

  const onCancel = useCallback(() => {
    setFiles([]);
    setIsRemoveAll(false);
    setOpen(false);
  }, []);

  return <>
    <IconButton onClick={() => setOpen(true)} size="large">
      <UploadIcon />
    </IconButton>
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>インポート</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item>
            <Input type="file" onChange={onDrop} />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRemoveAll}
                  onChange={(_, checked) => {
                    setIsRemoveAll(checked);
                  }}
                />
              }
              label="すべて削除してからインポートする"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onImport}>インポート</Button>
        <Button onClick={onCancel}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  </>;
};
