import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/tasks/taskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
