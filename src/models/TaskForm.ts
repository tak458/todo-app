import { format, parse } from "date-fns";
import { DateTimePattern } from "./constants";
import { fromDurationFormat, toDurationFormat } from "./DurationFormat";
import { Task } from "./Task";

export interface TaskForm {
  /** タスク名 */
  name: string;
  /** メモ */
  note: string;
  /** 完了日時 */
  completedAt: string;
  /** 開始日時 */
  startedAt: string;
  /** 終了日時 */
  finishedAt: string;
  /** 見積もり時間（時間） */
  estimatedTime: string;
  /** 実績時間（時間） */
  actualTime: string;
}

export function convertToTask(taskForm: TaskForm): Omit<Task, "id" | "children"> {
  return {
    ...taskForm,
    estimatedTime: toDurationFormat(taskForm.estimatedTime),
    actualTime: toDurationFormat(taskForm.actualTime),
    startedAt: toTimestamp(taskForm.startedAt),
    finishedAt: toTimestamp(taskForm.finishedAt),
    completedAt: toTimestamp(taskForm.completedAt),
  };
}

export function convertFromTask(task: Omit<Task, "id" | "children">): TaskForm {
  return {
    note: "",
    ...task,
    estimatedTime: fromDurationFormat(task.estimatedTime),
    actualTime: fromDurationFormat(task.actualTime),
    startedAt: fromTimestamp(task.startedAt),
    finishedAt: fromTimestamp(task.finishedAt),
    completedAt: fromTimestamp(task.completedAt),
  };
}

function toTimestamp(value: string): number | undefined {
  if (value) {
    return parse(value, DateTimePattern, new Date()).getTime();
  }
  return undefined;
}

function fromTimestamp(value: number | undefined): string {
  if (value) {
    return format(value, DateTimePattern);
  }
  return "";
}

export function createNewTaskForm(): TaskForm {
  return {
    name: "",
    note: "",
    actualTime: "",
    estimatedTime: "",
    completedAt: "",
    startedAt: "",
    finishedAt: "",
  };
}
