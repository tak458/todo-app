import { useAppDispatch } from "@/hooks/toolkit";
import { Task } from "@/models/Task";
import { tasks } from "@/store/modules/tasks";
import UploadIcon from "@mui/icons-material/FileOpen";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import { ChangeEventHandler, DragEventHandler, useCallback, useState } from "react";

export const DataImport = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isRemoveAll, setIsRemoveAll] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  }, []);

  const onDrop: DragEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
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

  return (
    <>
      <Tooltip title="ファイルを開く">
        <IconButton onClick={() => setOpen(true)} size="large">
          <UploadIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>インポート</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <Input type="file" onChange={onChange} onDrag={onDrop} />
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
    </>
  );
};
