import { combineReducers, configureStore, Action, EnhancedStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, Storage } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import { tasks } from "./modules/tasks";

// HACK: `redux-persist failed to create sync storage. falling back to noop storage.`の対応
// https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319
const createNoopStorage = (): Storage => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const rootReducer = combineReducers({
  tasks: tasks.reducer,
});

const persistConfig = {
  key: "todo-app",
  storage,
  whitelist: ["tasks"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export function useStore(): EnhancedStore {
  return store;
}

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, AppState, null, Action<string>>;
