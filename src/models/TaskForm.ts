import { format, parse } from "date-fns";
import { DateTimePattern } from "./constants";
import { fromDurationFormat, toDurationFormat } from "./DurationFormat";
import { Task } from "./Task";
import { z } from "zod";

export const taskFormSchema = z.object({
  name: z.string().min(1, { message: "Required" }).default(""),
  note: z.string().default(""),
  actualTime: z.string().default(""),
  estimatedTime: z.string().default(""),
  completedAt: z.boolean().default(false),
  startedAt: z.string().default(""),
  finishedAt: z.string().default(""),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;

export function convertToTask(taskForm: TaskFormSchema): Omit<Task, "id" | "children"> {
  return {
    ...taskForm,
    estimatedTime: toDurationFormat(taskForm.estimatedTime),
    actualTime: toDurationFormat(taskForm.actualTime),
    startedAt: toTimestamp(taskForm.startedAt),
    finishedAt: toTimestamp(taskForm.finishedAt),
    completedAt: taskForm.completedAt ? new Date().getTime() : undefined,
  };
}

export function convertFromTask(task: Omit<Task, "id" | "children">): TaskFormSchema {
  return {
    note: "",
    ...task,
    estimatedTime: fromDurationFormat(task.estimatedTime),
    actualTime: fromDurationFormat(task.actualTime),
    startedAt: fromTimestamp(task.startedAt),
    finishedAt: fromTimestamp(task.finishedAt),
    completedAt: !!(task.completedAt && task.completedAt > 0),
  };
}

export function toTimestamp(value: string): number | undefined {
  if (value) {
    return parse(value, DateTimePattern, new Date()).getTime();
  }
  return undefined;
}

export function fromTimestamp(value: number | undefined): string {
  if (value) {
    return format(value, DateTimePattern);
  }
  return "";
}
