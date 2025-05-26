import { Task } from "@/models/Task";
import { AppState } from "@/store";
import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { denormalize, normalize, schema } from "normalizr";

type StoredTask = { children: StoredTask["id"][] } & Omit<Task, "children">;

// normalizr schema
const taskSchema = new schema.Entity<StoredTask>("children");
const categoriesSchema = new schema.Array(taskSchema);
taskSchema.define({ children: categoriesSchema });

const tasksAdapter = createEntityAdapter<StoredTask>();

export const tasks = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState<{ ids: string[]; entities: { root: StoredTask } }>({
    ids: ["root"],
    entities: { root: { id: "root", name: "root", children: [] } },
  }),
  reducers: {
    add(state, action: PayloadAction<{ parentId?: string; model: Task }>) {
      const model = normalize(action.payload.model, taskSchema);
      const parentId = action.payload.parentId ?? "root";
      // 親エンティティが指定されている場合は追加する
      const parent = state.entities[parentId];
      tasksAdapter.updateOne(state, {
        id: parentId,
        changes: parent ? { ...parent, children: [...parent.children, model.result] } : { children: [model.result] },
      });
      // 自エンティティを追加
      tasksAdapter.addMany(state, Object.values(model.entities.children ?? {}));
    },
    update(state, action: PayloadAction<Task>) {
      const payload = normalize(action.payload, taskSchema);
      tasksAdapter.upsertMany(state, Object.values(payload.entities.children ?? {}));
    },
    remove(state, action: PayloadAction<Task>) {
      const model = normalize(action.payload, taskSchema);
      // 親エンティティの children から id を取り除く
      const parent = Object.values(state.entities).find((ent) => ent?.children.includes(model.result));
      if (!parent) return;
      tasksAdapter.updateOne(state, {
        id: parent.id,
        changes: { ...parent, children: [...parent.children.filter((child) => child !== model.result)] },
      });
      // 自エンティティを削除
      tasksAdapter.removeMany(state, [model.result]);
    },
    removeAll(state) {
      tasksAdapter.removeAll(state);
      tasksAdapter.addOne(state, { id: "root", name: "root", children: [] });
    },
  },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = tasksAdapter.getSelectors(
  (state: AppState) => state.tasks,
);

export const getTaskTree = createSelector(
  (state: AppState) => state.tasks,
  (state: AppState, visibleCompleted: boolean) => visibleCompleted,
  (tasks, visibleCompleted) => {
    // 完了タスクのID一覧
    const ids = Object.entries(tasks.entities)
      .filter(([, value]) => value?.completedAt)
      .map(([key]) => key);
    // 未完了タスクの一覧
    const children = Object.entries(tasks.entities)
      .filter(([key, value]) => key === "root" || !value?.completedAt)
      .map(([key, value]) => [key, { ...value, children: value?.children.filter((id) => !ids.includes(id)) }]);
    const result = denormalize(["root"], categoriesSchema, {
      children: visibleCompleted ? Object.fromEntries(children) : tasks.entities,
    })[0] as Task;
    return result;
  },
);
