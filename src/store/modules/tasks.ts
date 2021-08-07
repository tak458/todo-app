import { createEntityAdapter, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { denormalize, normalize, schema } from "normalizr";
import { AppState } from "..";
import { Task } from "../../models/Task";

type StoredTask = { children: StoredTask["id"][] } & Omit<Task, "children">;

// normalizr schema
const taskSchema = new schema.Entity("children");
const categoriesSchema = new schema.Array(taskSchema);
taskSchema.define({ children: categoriesSchema });

const tasksAdapter = createEntityAdapter<StoredTask>();

export const tasks = createSlice({
  name: "tasks",
  initialState: tasksAdapter.getInitialState({
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
      tasksAdapter.updateOne(state, {
        id: parent.id,
        changes: { ...parent, children: [...parent.children.filter((child) => child !== model.result)] },
      });
      // 自エンティティを削除
      tasksAdapter.removeMany(state, [model.result]);
    },
  },
});

export const { selectById, selectIds, selectEntities, selectAll, selectTotal } = tasksAdapter.getSelectors(
  (state: AppState) => state.tasks
);

export const getTaskTree = createSelector(
  (state: AppState) => state.tasks,
  (tasks) => denormalize(["root"], categoriesSchema, { children: tasks.entities })[0] as Task
);
