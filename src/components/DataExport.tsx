import DownloadIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useCallback } from "react";
import { useAppSelector } from "../hooks/toolkit";
import { getTaskTree } from "../store/modules/tasks";

export const DataExport = () => {
  const taskTree = useAppSelector((state) => getTaskTree(state, false));

  const onClick = useCallback(() => {
    if (taskTree) {
      const blob = new Blob([JSON.stringify(taskTree, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.download = "tasks.json";
      a.href = url;
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }
  }, [taskTree]);

  return (
    <Tooltip title="ファイルに保存">
      <IconButton onClick={onClick} size="large">
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};
