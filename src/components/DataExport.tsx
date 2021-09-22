import { IconButton } from "@mui/material";
import { VFC } from "react";
import { useAppSelector } from "../hooks/toolkit";
import { getTaskTree } from "../store/modules/tasks";
import DownloadIcon from "@mui/icons-material/ArrowUpward";
// import DownloadIcon from "@mui/icons-material/ArrowDownward";
import { useCallback } from "react";

export const DataExport: VFC = () => {
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
    <IconButton onClick={onClick} size="large">
      <DownloadIcon />
    </IconButton>
  );
};
